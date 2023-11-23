import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
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

export default function Fails() {
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

  useEffect(() => {
    setNoInfoToShow(filteredCoolers.length === 0);
  }, [filteredCoolers]);

  const [totalFilteredRecords, setTotalFilteredRecords] = useState(0);

  useEffect(() => {
    setTotalFilteredRecords(filteredCoolers.length);
  }, [filteredCoolers]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Evitar el desplazamiento en el cuerpo

    return () => {
      document.body.style.overflow = "auto"; // Restaurar el desplazamiento al salir del componente
    };
  }, []);

  return (
    <div>
      <PageFilter /> {/* Componente de barra filter */}
    </div>
  );
}
