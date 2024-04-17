import { useEffect, useState } from "react";
import supabase from "../lib/supabase-client"

function KeyRequests() {
  const [keyRequests, setKeyRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    async function getData(){
      const { data, error } = await supabase.from("key_request").select();
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setKeyRequests(data);
      }
    }
    getData();
  },[])

  function handleArrowClick(direction) {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < keyRequests.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  return (
    <div>
      <div className="KeyRequestPlaceholder">
        <h1>Key Requests</h1>
        {keyRequests[currentIndex] && Object.keys(keyRequests[currentIndex]).map(key => (
        <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${keyRequests[currentIndex][key]}`}</p>
      ))}
      </div>
      <div className="ArrowButtons">
        <button className="ArrowButton Left" onClick={() => handleArrowClick('left')}>←</button>
        <button className="ArrowButton Right" onClick={() => handleArrowClick('right')}>→</button>
      </div>
    </div>
  );
}

export default KeyRequests;