import React, { useState, useEffect } from "react";

export default function Panel() {
  // Page (Body)
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      {/* <iframe
        src="https://tableau.efemsa.com/views/KOF_Nacional/KOF?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y"
        title="iframe Example 1"
        width="900"
        height="1200"
        style={{ marginLeft: -30 }}
      >
        <p></p>
      </iframe> */}
    </>
  );
}
