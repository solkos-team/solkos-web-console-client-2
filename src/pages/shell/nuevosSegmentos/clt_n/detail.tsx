import React, { useState, useEffect } from "react";
import PageFilter from "../../../../components/pageFilter";
import { Tooltip, Skeleton } from "@mantine/core";
import { useParams } from "react-router-dom";
import { fetchUniversalDetails } from "../../../../utils/apiUtils";
import moment from "moment";
import "moment/locale/es";
import { CoolerData } from "../../../../interfaces/CoolerInterface";
import MapComponent from "../../../../components/map";
import MapComponent1 from "../../../../components/map_1";
import MapComponent2 from "../../../../components/map_2";
import { IconArrowRight } from "@tabler/icons-react";
import DrawerInversion from "../../../../components/drawerInversion/DrawerInversion";
import DrawerEnergy from "../../../../components/drawerEnergy/DrawerEnergy";
import { useDisclosure } from "@mantine/hooks";
moment.locale("es", {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
});

export const Detail = () => {
  const b = "../../sampleData/devices.png";
  const { serial_number } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<CoolerData | null>(null);
  const [editSerie, setEditSerie] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serie, SetSerie] = useState(serial_number);
  const [inversionOpened, { open: openInversion, close: closeInversion }] =
    useDisclosure(false);
  const [energyOpened, { open: openEnergy, close: closeEnergy }] =
    useDisclosure(false);

  const fetchData = async (serie?) => {
    try {
      const data = await fetchUniversalDetails(
        "coolers",
        serie,
        "GET",
        setIsLoading
      );
      setCoolersData(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(serie);
  }, []);

  useEffect(() => {}, [serial_number, coolersData]);
  const searchSerial = (value) => {
    value == "" || value == null || value == undefined
      ? alert("Ingresa datos correctos! ")
      : fetchData(value);
    setEditSerie(false);
  };
  return (
    <>
      {" "}
      <PageFilter path="clt" disabledPath={true} />
    </>
  );
};
