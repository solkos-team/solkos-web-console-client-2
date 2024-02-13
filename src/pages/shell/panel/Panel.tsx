import React, { useState, useEffect } from "react";
import { Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
      {/* <iframe
        src="https://tableau.efemsa.com/views/KOF_Nacional/KOF?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y"
        title="iframe Example 1"
        width="900"
        height="1200"
        style={{ marginLeft: -30 }}
      >
        <p></p>
      </iframe> */}
      <Drawer opened={opened} onClose={close} title="Authentication" position="right">
        {/* Drawer content */}
      </Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </>
  );
}
