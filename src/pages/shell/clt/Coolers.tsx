import React, { useState, useEffect } from "react";
import PageFilter from "../../../components/pageFilter";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import {
  IconSearch,
  IconDownload,
  IconLoader,
  IconArrowRight,
} from "@tabler/icons-react";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import ExcelJS from "exceljs";
import { _Center } from "@mantine/core/lib/Center/Center";

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
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setNoInfoToShow(false);
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
      algorithm: ["INSTALLED"],
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
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or error
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

  return (
    <div>
      <PageFilter /> {/* Componente de barra filter */}
      <div
        style={{
          display: "flex",
          padding: "16px 0px",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "16px",
          flex: 100,
          alignSelf: "stretch",
          width: "100%",
          marginLeft: -90,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              color: "#000005",
              // fontFamily: "DM Sans",
              fontSize: "26px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "155%",
            }}
          >
            Cooler Life Tracking
          </div>
          <div
            style={{
              color: "#88888B",
              // fontFamily: "DM Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "155%",
            }}
          >
            Haz seguimiento de todos los parámetros de cada uno de tus
            enfriadores
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 0px",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "32px 0px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 100,
                alignSelf: "stretch",
              }}
            >
              <input
                value={searchValue}
                onChange={handleSearchChange}
                type="text"
                placeholder="Busca por..."
                style={{
                  // color: "#ADBACC",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "28px",
                  width: "600px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "32px",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "1%",
                textTransform: "uppercase",
              }}
            >
              TABLA
            </div>
            <div
              style={{
                color: "#000005",
                // fontFamily: "DM Sans",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "155%",
              }}
            >
              Enfriadores
            </div>
          </div>
          {/*  ************TABLA ************* */}

          <div>
            <div>
              <div>
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "1000px",
                    }}
                  >
                    <IconLoader size={35} />
                  </div>
                ) : filteredCoolers.length > 0 ? (
                  <Card>
                    <Table style={{ marginBottom: "20px" }}>
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell style={{ textAlign: "left" }}>
                            {"Estatus"}
                          </TableHeaderCell>
                          <TableHeaderCell style={{ textAlign: "left" }}>
                            Serie
                          </TableHeaderCell>
                          <TableHeaderCell style={{ textAlign: "left" }}>
                            Modelo
                          </TableHeaderCell>
                          <TableHeaderCell style={{ textAlign: "left" }}>
                            Días sin visita
                          </TableHeaderCell>
                          <TableHeaderCell style={{ textAlign: "left" }}>
                            {" "}
                            Prioridad
                          </TableHeaderCell>
                          <TableHeaderCell style={{ textAlign: "left" }}>
                            Acciones
                          </TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredCoolers.map((cooler, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ paddingRight: "30px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "4px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "2px",
                                  background: "#B6FEDB",
                                }}
                              >
                                <div
                                  style={{
                                    width: "4px",
                                    height: "4px",
                                    borderRadius: "5px",
                                    background: "#31B648",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    color: "#028053",
                                    // fontFamily: "Space Mono",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "14px",
                                  }}
                                >
                                  FUNCIONANDO CORRECTAMENTE
                                </div>
                              </div>
                            </TableCell>
                            <TableCell style={{ paddingRight: "30px" }}>
                              {cooler.serial_number}
                            </TableCell>
                            <TableCell style={{ paddingRight: "30px" }}>
                              {cooler.model_id}
                            </TableCell>
                            <TableCell style={{ paddingRight: "30px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "4px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "2px",
                                  background: "#D4DAE3",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#313A49",
                                    // fontFamily: "Space Mono",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "14px",
                                  }}
                                >
                                  {" "}
                                  0 DÍAS
                                </div>
                              </div>
                            </TableCell>
                            <TableCell style={{ paddingRight: "30px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "4px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "4px",
                                  borderRadius: "2px",
                                  border: "1.5px solid #0F9F67",
                                  background: "#FFF",
                                }}
                              >
                                <div
                                  style={{
                                    color: "#0F9F67",
                                    // fontFamily: "DM Sans",
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    lineHeight: "14px",
                                  }}
                                >
                                  SIN ACCIONES
                                </div>
                              </div>
                            </TableCell>
                            <TableCell style={{ paddingRight: "30px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  height: "48px",
                                  // padding: "14px 16px",
                                  alignItems: "center",
                                  gap: "10px",
                                  // alignSelf: "stretch",
                                  borderBottom: "1px solid #CACACA",
                                }}
                              >
                                <Link to="/coolerDetail">
                                  <div
                                    style={{
                                      color: "#3E83FF",
                                      // fontFamily: "DM Sans",
                                      fontSize: "12px",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "20px",
                                      display: "flex",
                                    }}
                                  >
                                    Ver más <IconArrowRight size={14} />
                                  </div>
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                ) : (
                  <p>No hay datos de coolers disponibles.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
