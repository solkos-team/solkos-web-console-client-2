import React, { useState, useEffect } from "react";
import { tableauFetch } from "../../../utils/apiUtils";
import { useSelector } from "react-redux";
import TableauReport from "tableau-react";
import PageFilter from "../../../components/pageFilter";
import { Loader } from "@mantine/core";

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

  // console.log(data);
  // console.log(isLoading);

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
          {dto === "Yza" ? (
            <>
              <PageFilter />
              <br></br>
              <TableauReport
                url="https://tableau.efemsa.com/views/Yza/Performance?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:embed=y"
                token={data}
                options={options}
              />
            </>
          ) : dto === "KOF" ? (
            <>
              <PageFilter />
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
              <PageFilter />
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
      )}
    </section>
  );
}
