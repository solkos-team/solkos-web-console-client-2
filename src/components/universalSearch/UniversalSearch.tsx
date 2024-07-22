import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { Text } from "@mantine/core";

export const UniversalSearch = ({ setModalOpened,menuResponsive }) => {
  const container = document.querySelector(".pagefilter_container_items");

  function scrollToEnd() {
    container!.scrollLeft = container!.scrollWidth;
  }

  window.onload = scrollToEnd;

  return (
    <>
      <div className="universal_search_principal">
        <div
          style={{
            display: "flex",
            padding: "1px 10px",
            alignItems: "center",
            gap: "10px",
            flex: "100",
          }}
          onClick={() => setModalOpened(true)}
        >
          <IconSearch
            style={{
              color: "#ADBACC",
              width: "12px",
              height: "12px",
              marginRight: "3px",
            }}
          />
          <Text
            style={{
              display: "flex",
              color: "#ADBACC",
              fontSize: "10px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "14px",
              textTransform: "uppercase",
            }}
          >
            Buscar
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              alignSelf: "stretch",
              borderRadius: "2px",
              background: "#D4DAE3",
              padding: "4px",
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                color: "#313A49",
                fontSize: "8px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "14px",
              }}
            >
              Ctrl + X
            </div>
          </div>
        </div>
      </div>
      <div className="universal_search_principal_responsive" style={{display: menuResponsive == true ? '' : 'none'}}  >
        <IconSearch
          style={{
            color: "#ADBACC",
          }}
          onClick={() => setModalOpened(true)}
        />
      </div>
    </>
  );
};
