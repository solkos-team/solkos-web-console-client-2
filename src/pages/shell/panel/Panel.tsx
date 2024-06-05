import React, { useState, useEffect } from "react";
import { tableauFetch } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import TableauReport from "tableau-react";
import PageFilter from "../../../components/pageFilter";
import { Loader } from "@mantine/core";
import { Tabs } from "@mantine/core";

export default function Panel() {
  const [data, setData] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://us-central1-imberalink-238816.cloudfunctions.net/get-trusted-ticket-cors`;
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  function pathVerify() {
    return dt.length === 0 ? [] : JSON.parse(dt);
  }
  const verifiedPath = pathVerify();
  const region = verifiedPath[0] || "";
  const zone = verifiedPath[1] || "";
  const operative_unit = verifiedPath[2] || "";
  const route = verifiedPath[3] || "";

  const fetchToken = async () => {
    try {
      const data = await tableauFetch(URL, setIsLoading);
      const datos = await data;
      setData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [region, zone, operative_unit, route]);


  const options = {
    height: "800px",
    width: "80%",
  };

  const parameters = {
    region: region,
    management_zone: zone,
    operative_unit: operative_unit,
    route: route,
  };
  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageFilter />
          <br></br>
          <div
            style={{
              display: "flex",
              padding: "16px",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "stretch",
            }}
          >
            <text
              style={{
                color: "#000",
                fontSize: "1.5rem",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "140%",
                marginLeft: -55,
              }}
            >
              Tableros
            </text>
          </div>

          <div>
            <Tabs color="teal" defaultValue="first" style={{ width: "100%" }}>
              <Tabs.List>
                <Tabs.Tab value="first" style={{ fontSize: ".9vw" }}>
                  <img
                    src={"../../sampleData/star.svg"}
                    alt="Icono"
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                    }}
                  />
                  Tablero 1
                </Tabs.Tab>
                <Tabs.Tab value="second" style={{ fontSize: ".9vw" }}>
                  <img
                    src={"../../sampleData/star.svg"}
                    alt="Icono"
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                    }}
                  />
                  Tablero 2
                </Tabs.Tab>
              </Tabs.List>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Tabs.Panel value="first">
                  <>
                    {dto === "YZA" ? (
                      <>
                        <br></br>
                        <TableauReport
                          url="https://tableau.efemsa.com/views/Yza/Performance?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y"
                          token={data}
                          options={options}
                          parameters={parameters}
                          query="?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes"
                        />
                      </>
                    ) : dto === "KOF" ? (
                      <>
                        <br></br>
                        <TableauReport
                          url={`https://tableau.efemsa.com/views/Test_KOF/ControldelActivos?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                          token={data}
                          options={options}
                          parameters={parameters}
                          query="?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes"
                        />
                      </>
                    ) : dto === "HEINEKEN" ? (
                      <>
                        <br></br>
                        <TableauReport
                          url={`https://tableau.efemsa.com/views/HNK_17151853863070/Cobertura?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&`}
                          token={data}
                          options={{ height: "800px", width: "100%" }}
                          parameters={parameters}
                          query="?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes"
                        />
                      </>
                    ) : (
                      "Sin información"
                    )}
                  </>
                </Tabs.Panel>

                <Tabs.Panel value="second">
                  <></>
                </Tabs.Panel>
              </div>
            </Tabs>
          </div>
        </>
      )}
    </section>
  );
}
