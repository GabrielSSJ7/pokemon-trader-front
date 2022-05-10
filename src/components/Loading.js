import React from "react";
import ReactLoading from "react-loading";

function Loading({ position }) {
  return (
    <div style={{
      position: position ? position : "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: "64px",
	height: "64px",
	margin: 'auto',
    }} className="loading-container">
      <ReactLoading type="bubbles" color="#00bcd4" />
    </div>
  );
}

export default Loading;
