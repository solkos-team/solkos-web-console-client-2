import React, { useEffect } from "react";
import { Drawer } from "@mantine/core";
import { formatDrawerCoolview, getMonth } from "../../../Functions/Coolview";

export const coolviewDrawer = ({ opened, onClose, CoolerId }) => {
  const mesToday = new Date();
  useEffect(() => {
    formatDrawerCoolview()
  }, [opened]);
  formatDrawerCoolview()
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="CoolView"
      position="bottom"
      size="76%"
      overlayOpacity={0.1}
      overlayBlur={0}
      className="drawerCoolview"
    >
      <section className="coolview_printipal">        
        <iframe
          src={`https://solkos-coolview-2.firebaseapp.com?device_id=${CoolerId}&start_date=${
            getMonth(mesToday.getMonth()).firstDay
          }&end_date=${getMonth(mesToday.getMonth() + 1).lastDay}&clt=false`}
          width="100%"
          height="100%"
          frameBorder="0"
        />        
      </section>
    </Drawer>
  );
};
