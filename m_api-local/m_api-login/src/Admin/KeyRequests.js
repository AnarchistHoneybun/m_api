function KeyRequests() {
  return (
    <div>
      <h1>Key Requests</h1>
        <div className="KeyRequestPlaceholder"></div> {/* Add this line */}
      <div className="ArrowButtons"> {/* Add this line */}
        <button className="ArrowButton Left">←</button> {/* Add this line */}
        <button className="ArrowButton Right">→</button> {/* Add this line */}
        {/* Key Requests content goes here */}
      </div>

    </div>
  );
}

export default KeyRequests;