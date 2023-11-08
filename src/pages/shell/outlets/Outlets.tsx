import React, { useState, useEffect } from "react";
import Page from "../../../components/page";
import { IconSearch, IconDownload } from "@tabler/icons-react";
import {
  Card,
  Table,
  Pagination,
  Select,
  Loader,
  TextInput,
  Paper,
  Tooltip,
  Text,
} from "@mantine/core";
import ExcelJS from "exceljs";

export default function Outlets() {
  interface Outlet {
    outlet_id: string;
    outlet_name: string;
    region: string;
  }

  const [searchValue, setSearchValue] = useState("");
  const [outletsData, setOutletsData] = useState<Outlet[] | null>(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false); // Restablecer el estado cuando se realiza una nueva búsqueda
  };

  const filterOutlets = (data, searchQuery) => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery.toLowerCase();
      const codeEnfriador = item.outlet_id.toLowerCase();
      const deviceId = item.outlet_name.toLowerCase();
      return (
        codeEnfriador.includes(searchString) || deviceId.includes(searchString)
      );
    });
    return filteredData;
  };

  const fetchOutletsFromAPI = async () => {
    const url =
      "https://universal-console-server-b7agk5thba-uc.a.run.app/outlets";
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      customer: "KOF",
      path: ["Monarca", "Morelia"],
      page_size: 10,
      page_number: 1,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de los enfriadores");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOutletsFromAPI();
        setOutletsData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const filteredOutlets = outletsData
    ? filterOutlets(outletsData, searchValue)
    : [];

  // Actualiza el estado "noInfoToShow" si no se encontraron resultados
  useEffect(() => {
    setNoInfoToShow(filteredOutlets.length === 0);
  }, [filteredOutlets]);

  const [totalFilteredRecords, setTotalFilteredRecords] = useState(0);

  useEffect(() => {
    setTotalFilteredRecords(filteredOutlets.length);
  }, [filteredOutlets]);

  return (
    <div>
      <Page
        current="Puntos de venta"
        paths={[{ name: "Consola", to: "/" }]}
        view=""
        controls={[]}
      >
        <TextInput
          placeholder="Buscar código o nombre de punto de venta"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={searchValue} // Asociar el valor del campo de búsqueda al estado
          onChange={handleSearchChange} // Manejar cambios en el campo de búsqueda
        />
        <br></br>
        {/* Mostrar el número total de registros filtrados */}
        <Text style={{ textAlign: "left" }}>
          {totalFilteredRecords} Puntos de venta
        </Text>
        <br></br>
        <Table>
          <thead>
            <tr>
              <th>
                <center>Código punto de venta</center>
              </th>
              <th>
                <center>Nombre</center>
              </th>
              <th>
                <center>Dirección</center>
              </th>
              <th>
                <center>Región</center>
              </th>
            </tr>
          </thead>
          <tbody>
            {outletsData ? (
              filteredOutlets.map((outlet, index) => (
                <tr key={index}>
                  {/* <td style={{ textAlign: "left" }}>{outlet.outlet_id}</td> */}
                  <td>{outlet.outlet_id}</td>
                  <td>{outlet.outlet_name}</td>
                  <td>{""}</td>
                  <td>{outlet.region}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  <Loader size="md" color="#ff4c8c" />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Page>
    </div>
  );
}
