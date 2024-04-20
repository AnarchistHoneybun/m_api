import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";
import { generate, count } from "random-words";
import {CircleCheckBig, CircleX, ArrowRight, ArrowLeft} from "lucide-react"
import {toast, ToastContainer} from "react-toastify";

function KeyRequests() {
  const [keyRequests, setKeyRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.rpc("get_key_requests");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setKeyRequests(data);
      }
    }
    getData();
  }, []);

  function handleArrowClick(direction) {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex < keyRequests.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  async function getData() {
    const { data, error } = await supabase.rpc("get_key_requests");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setKeyRequests(data);
    }
  }

  async function handleDenyClick() {
    const currentRequest = keyRequests[currentIndex];
    const { error } = await supabase
      .from("key_request")
      .delete()
      .eq("request_id", currentRequest.request_id);

    if (error) {
      console.error("Error deleting data:", error);
    } else {
      getData(); // Fetch the data again after deletion
    }
  }

  async function handleApproveClick() {
    const currentRequest = keyRequests[currentIndex];
    const { error: deleteError } = await supabase
      .from("key_request")
      .delete()
      .eq("request_id", currentRequest.request_id);

    if (deleteError) {
      console.error("Error deleting data:", deleteError);
    } else {
      const apiKey = `${generate({
        minLength: 4,
        maxLength: 7,
      }).toUpperCase()}-${generate({
        minLength: 5,
        maxLength: 9,
      }).toUpperCase()}`;
      const billingDate = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      const { error } = await supabase.from("api_key").insert(
        {
          key_name: apiKey,
          user_id: currentRequest.user_id,
          billing_date: billingDate,
          expiry_date: expiryDate,
          tier_id: currentRequest.request_tier,
        },
      );

      if (error) {
        toast(error.message, {type: "error"});
      } else {
        getData(); // Fetch the data again after approval
      }
    }
  }

  return (
    <div>
      <div className="KeyRequestPlaceholder">
        <div className="KeyRequestInfo">
          <h1>Key Requests</h1>
          {keyRequests.length ? (
            keyRequests[currentIndex] && (
              <>
                <p>Request ID: {keyRequests[currentIndex].request_id}</p>
                <p>User ID: {keyRequests[currentIndex].user_id}</p>
                <p>
                  Request Reason: {keyRequests[currentIndex].request_reason}
                </p>
                <p>Request Tier: {keyRequests[currentIndex].request_tier}</p>
                <p>Username: {keyRequests[currentIndex].username}</p>
              </>
            )
          ) : (
            <>No key requests pending</>
          )}
        </div>
        <div className="Approval">
          <button
            className="ApprovalButton DenyRequest"
            onClick={handleDenyClick}
          >
            <CircleX/>
            <div>
              Deny
            </div>
          </button>
          <button
            className="ApprovalButton ApproveRequest"
            onClick={handleApproveClick}
          >
            <CircleCheckBig/>
            <div>
              Approve
            </div>
          </button>
        </div>
      </div>
      <div className="ArrowButtons">
        <button
          className="ArrowButton Left"
          onClick={() => handleArrowClick("left")}
        ><ArrowLeft/></button>
        <button
          className="ArrowButton Right"
          onClick={() => handleArrowClick("right")}
        ><ArrowRight/></button>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default KeyRequests;
