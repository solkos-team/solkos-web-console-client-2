import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";

export default function Panel() {
  const dt = useSelector((state: any) => state.works);
  const pathVerify = () => {
    return dt.length === 0 ? [] : JSON.parse(dt);
  };
  // console.log(pathVerify()[0]);
  // console.log(pathVerify()[1]);
  const region = pathVerify()[0] === undefined ? "" : pathVerify()[0];
  const zone = pathVerify()[1] === undefined ? "" : pathVerify()[1];
  const operative_unit = pathVerify()[2] === undefined ? "" : pathVerify()[2];
  const route = pathVerify()[3] === undefined ? "" : pathVerify()[3];
  const iframeUrl = `https://tableau.efemsa.com/views/Test_KOF/ControldelActivos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y&region=${region}&management_zone=${zone}&operative_unit=${operative_unit}&route=${route}`;
  // const iframeUrl = `https://tableau.efemsa.com/views/Test_KOF/ControldelActivos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y&region=Golfo&management_zone=Huasteca&operative_unit=&route=`;

  // console.log(region, zone, operative_unit, route);
  // Page (Body)
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <PageFilter />
      <iframe
        src={iframeUrl}
        title="iframe Example 1"
        width="900"
        height="800"
        style={{ marginLeft: -30, marginTop: 20, border: "none" }}
      >
        <p></p>
      </iframe>
    </>
  );
}
