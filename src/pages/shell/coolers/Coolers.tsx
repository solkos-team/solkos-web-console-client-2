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

export default function Coolers() {
  interface Cooler {
    serial_number: string;
    device_id: string;
    model_id: string;
    outlet_name: string;
    region: string;
    route: string;
  }

  const [searchValue, setSearchValue] = useState("");
  const [coolersData, setCoolersData] = useState<Cooler[] | null>(null);
  const [noInfoToShow, setNoInfoToShow] = useState(false);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false); // Restablecer el estado cuando se realiza una nueva búsqueda
  };

  const filterCoolers = (data, searchQuery) => {
    const filteredData = data.filter((item) => {
      const searchString = searchQuery.toLowerCase();
      const codeEnfriador = item.serial_number.toLowerCase();
      const deviceId = item.device_id.toLowerCase();
      return (
        codeEnfriador.includes(searchString) || deviceId.includes(searchString)
      );
    });
    return filteredData;
  };

  const fetchCoolersFromAPI = async () => {
    const url =
      "https://universal-console-server-b7agk5thba-uc.a.run.app/coolers";
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      customer: "KOF",
      class: "STK",
      algorithm: ["INSTALLATION"],
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
        const data = await fetchCoolersFromAPI();
        setCoolersData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCoolers = coolersData
    ? filterCoolers(coolersData, searchValue)
    : [];

  // Actualiza el estado "noInfoToShow" si no se encontraron resultados
  useEffect(() => {
    setNoInfoToShow(filteredCoolers.length === 0);
  }, [filteredCoolers]);

  const [totalFilteredRecords, setTotalFilteredRecords] = useState(0);

  useEffect(() => {
    setTotalFilteredRecords(filteredCoolers.length);
  }, [filteredCoolers]);

  return (
    <div>
      <Page
        current="Enfriadores"
        paths={[{ name: "Consola", to: "/" }]}
        view=""
        controls={[]}
      >
        <TextInput
          placeholder="Buscar id coolector"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={searchValue} // Asociar el valor del campo de búsqueda al estado
          onChange={handleSearchChange} // Manejar cambios en el campo de búsqueda
        />
        <br></br>
        {/* Mostrar el número total de registros filtrados */}
        <Text style={{ textAlign: "left" }}>
          {totalFilteredRecords} Enfriadores
        </Text>
        <br></br>
        <Table>
          <thead>
            <tr>
              <th>
                <center>Código enfriador</center>
              </th>
              <th>
                <center>Mac</center>
              </th>
              <th>
                <center>Modelo</center>
              </th>
              <th>
                <center>Última visita</center>
              </th>
              <th>
                <center>Punto de venta</center>
              </th>
              <th>
                <center>Región</center>
              </th>
              <th>
                <center>Ruta</center>
              </th>
            </tr>
          </thead>
          <tbody>
            {coolersData ? (
              filteredCoolers.map((cooler, index) => (
                <tr key={index}>
                  <td>{cooler.serial_number}</td>
                  <td>{cooler.device_id}</td>
                  <td>{cooler.model_id}</td>
                  <td>{""}</td>
                  <td>{cooler.outlet_name}</td>
                  <td>{cooler.region}</td>
                  <td>{cooler.route}</td>
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
