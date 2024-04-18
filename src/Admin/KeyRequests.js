import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client";

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

  return (
    <div>
      <div className="KeyRequestPlaceholder">
        <div className="KeyRequestInfo">
          <h1>Key Requests</h1>
          {keyRequests[currentIndex] && (
            <>
              <p>Request ID: {keyRequests[currentIndex].request_id}</p>
              <p>User ID: {keyRequests[currentIndex].user_id}</p>
              <p>Request Reason: {keyRequests[currentIndex].request_reason}</p>
              <p>Request Tier: {keyRequests[currentIndex].request_tier}</p>
              <p>Username: {keyRequests[currentIndex].username}</p>
            </>
          )}
        </div>
        <div className="Approval">
          <button className="ApprovalButton DenyRequest">Deny</button>
          <button className="ApprovalButton ApproveRequest">Approve</button>
        </div>
      </div>
      <div className="ArrowButtons">
        <button
          className="ArrowButton Left"
          onClick={() => handleArrowClick("left")}
        >
          ←
        </button>
        <button
          className="ArrowButton Right"
          onClick={() => handleArrowClick("right")}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default KeyRequests;
