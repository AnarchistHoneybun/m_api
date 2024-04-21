import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase-client";
import "./User.css";
import BuyKeyModal from "./BuyKeyModal";
import PaymentModal from "./PaymentModal";
import { LogOut, ShoppingBasket, ArrowBigUpDash, Coins } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

function User() {
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [userName, setUserName] = useState("");
  const [apiKeys, setApiKeys] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [totalKeys, setTotalKeys] = useState(0);
  const [totalBandwidth, setTotalBandwidth] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  const navigate = useNavigate();

  async function fetchApiKeysAndEndpoints(username) {
    const res = await supabase
      .from("users")
      .select("user_id, api_key(key_name, key_id)")
      .eq("username", username);

    setTotalKeys(res.data[0].api_key.length);

    for await (const x of res.data[0].api_key) {
      const { data: metric_data } = await supabase
        .from("usage_metric")
        .select("*")
        .eq("key_id", x.key_id);
      if (metric_data.length) {
        setTotalBandwidth((x) => (x += metric_data[0].total_data));
        setTotalRequests((x) => (x += metric_data[0].total_requests));
      }
    }
    setApiKeys(res.data[0].api_key);

    const { data: endpointsData } = await supabase
      .from("endpoint")
      .select("endpoint_name");
    setEndpoints(endpointsData);
  }

  useEffect(() => {
    async function getCurrentUser() {
      let res = await supabase.auth.getUser();
      if (res.error) {
        navigate("/");
      } else {
        res = await supabase
          .from("users")
          .select("username")
          .eq("email", res.data.user.email);
        setUserName(res.data[0].username);
        fetchApiKeysAndEndpoints(res.data[0].username);
      }
    }
    getCurrentUser();
  }, []);

  const handleMakeRequest = async () => {
    if (!selectedApiKey || !selectedEndpoint) {
      toast("Please select both an API Key and an Endpoint.", {
        type: "error",
      });
      return;
    }
    const key_id = selectedApiKey;

    // Fetch the endpoint_id for the selected Endpoint
    const { data: endpointData } = await supabase
      .from("endpoint")
      .select("endpoint_id")
      .eq("endpoint_name", selectedEndpoint);
    const endpoint_id = endpointData[0].endpoint_id;

    const { count } = await supabase
      .from("api_call")
      .select("call_id", { count: "exact" });

    const call_id = count + 1;

    const random = Math.random();

    let status, call_metric;
    if (random <= 0.7) {
      status = "SUCCESS";
      call_metric = Math.floor(Math.random() * 51) + 10; // Random number between 10 and 60
    } else {
      status = "FAILED";
      call_metric = 0;
    }

    const { error } = await supabase.from("api_call").insert([
      {
        call_id: call_id,
        key_id: key_id,
        call_log: new Date(),
        status: status,
        call_metric: call_metric,
        endpoint_id: endpoint_id,
      },
    ]);

    if (error) {
      toast(error.message, { type: "error" });
    } else {
      toast("API call successfully made!", { type: "success" });
    }
  };

  const handleBuyKey = () => {
    setIsModalOpen(true);
  };

  const handlePayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handleModalSubmit = async (selectedTier, requestReason) => {
    let res = await supabase.auth.getUser();
    res = await supabase
      .from("users")
      .select("user_id")
      .eq("email", res.data.user.email);

    const user_id = res.data[0].user_id;

    const { error } = await supabase.from("key_request").insert([
      {
        user_id: user_id,
        request_reason: requestReason,
        request_tier: selectedTier,
      },
    ]);

    if (error) {
      toast(error.message, { type: "error" });
    } else {
      toast("Key request successfully made!", { type: "success" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="hello-user">Hello {userName}</div>
            <div className="header-buttons">
              <button className="payment centerContainer" onClick={handlePayment}>
                <Coins className="center"/>
                <div className="center">Payment</div>
              </button>
              <PaymentModal
                  isOpen={isPaymentModalOpen}
                  onClose={() => setIsPaymentModalOpen(false)}
              />
              <button className="buy-key centerContainer" onClick={handleBuyKey}>
                <ShoppingBasket className="center"/>
                <div className="center">Buy Key</div>
              </button>
              <BuyKeyModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleModalSubmit}
              />
              <button className="logout centerContainer" onClick={handleLogout}>
                <LogOut className="center"/>
                <div className="center">Log Out</div>
              </button>
            </div>
          </div>
        </header>
        <main className="content">
          <div className="metrics-container">
            <div className="key-metric">
              <div className="metric-title">Total Keys</div>
              <div className="metric-value">{totalKeys}</div>
            </div>
            <div className="band-metric">
              <div className="metric-title">Total Bandwidth</div>
              <div className="metric-value">{totalBandwidth}</div>
            </div>
            <div className="request-metric">
              <div className="metric-title">Total Requests</div>
              <div className="metric-value">{totalRequests}</div>
            </div>
          </div>
          <div className="dropdown-container">
            <select
                className="dropdown"
                onChange={(e) => setSelectedApiKey(e.target.value)}
            >
              <option value="">Select an API Key</option>
              {apiKeys.map((key, index) => (
                  <option key={index} value={key.key_id}>
                    {key.key_name}
                  </option>
              ))}
            </select>
            <select
                className="dropdown"
                onChange={(e) => setSelectedEndpoint(e.target.value)}
            >
              <option value="">Select an Endpoint</option>
              {endpoints.map((endpoint, index) => (
                  <option key={index} value={endpoint.endpoint_id}>
                    {endpoint.endpoint_name}
                  </option>
              ))}
            </select>
          </div>
          <button
              className="request-button centerContainer"
              onClick={handleMakeRequest}
          >
            <ArrowBigUpDash className="center"/>
            <div className="center">Make a New Request</div>
          </button>
        </main>
        <ToastContainer/>
      </div>
  );
}

export default User;
