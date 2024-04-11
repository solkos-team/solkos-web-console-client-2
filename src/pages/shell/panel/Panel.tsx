import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { Drawer, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowDownRight, IconArrowRight } from "@tabler/icons-react";
export default function Panel() {
  const [opened, { open, close }] = useDisclosure(false);
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
        src="https://tableau.efemsa.com/views/KOF_Nacional/KOF?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y&region=Monarca&Zona=Toluca
        "
        title="iframe Example 1"
        width="900"
        height="1200"
        style={{ marginLeft: -30, marginTop: 20 }}
      >
        <p></p>
      </iframe>
    </>
  );
}
