import React, { useState, useEffect } from "react";
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
// import { getCoolers, db } from "../../../firebase/firebase-config";
import ExcelJS from "exceljs";
import Page from "../../../components/page";
import { IconSearch, IconDownload } from "@tabler/icons-react";

export default function Coolers() {
  const [coolersData, setCoolersData] = useState<any[]>([
    {
      "Código enfriador": "F94201205148",
      Mac: "B4A2EB42ABB0",
      Modelo: "G3D26 D BMAR R2",
      "Última visita": "2023/10/17",
      "Punto de venta": "ZORAIDA",
      Región: "Chilapa",
      Ruta: "HV0107",
    },
    {
      "Código enfriador": "A94190807948",
      Mac: "B4A2EB404E4D",
      Modelo: "G319 D BMAD R2",
      "Última visita": "2021/11/10",
      "Punto de venta": "ZURY II",
      Región: "Tenango",
      Ruta: "TG0006",
    },
    {
      "Código enfriador": "F94211103383",
      Mac: "B4A2EB44535A",
      Modelo: "G3D26 D BMAR R2",
      "Última visita": "2023/10/13",
      "Punto de venta": "ZURYANG",
      Región: "Puebla Norte",
      Ruta: "NPP014",
    },
    {
      "Código enfriador": "F94230308400",
      Mac: "C128C66330088479144",
      Modelo: "G326",
      "Última visita": "2023/10/09",
      "Punto de venta": "ZURIEL MART�NEZ SORIA",
      Región: "Iguala-Taxco",
      Ruta: "IA0013",
    },
    {
      "Código enfriador": "A94190704910",
      Mac: "B4A2EB402C6C",
      Modelo: "G319 D BMAD R2",
      "Última visita": "2023/10/18",
      "Punto de venta": "ZULEMA SOTELO SOBERANIS",
      Región: "Zihuatanejo",
      Ruta: "ZH0075",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(100);
  const [loading, setLoading] = useState(false); //Para Firebase debe ser TRUE
  const [downloading, setDownloading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = coolersData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(coolersData.length / itemsPerPage);
  const coolersSize = coolersData.length;
  // const coolersSizeFormatted = coolersSize.toLocaleString();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getCoolers(db);
  //       setCoolersData(data);
  //     } catch (error) {
  //       console.error("Error al obtener los coolers", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    const itemsPerPageValue = parseInt(value, 10);
    setItemsPerPage(itemsPerPageValue);
    setCurrentPage(1);
  };

  const downloadExcel = async () => {
    setIsDownloading(true);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Coolers");

    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: "center" },
    };

    const headerRow = worksheet.addRow([
      "Código enfriador",
      "Mac",
      "Modelo",
      "Última visita",
      "Punto de venta",
      "Región",
      "Ruta",
    ]);

    headerRow.eachCell((cell) => {
      cell.font = headerStyle.font;
    });

    // Estilos de celda de encabezados
    const headerRange = worksheet.getRow(1);
    headerRange.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "e8f4fc" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { horizontal: "center" };
    });

    // coolersData.forEach((item) => {
    //   worksheet.addRow([item.serial_number, item.mac, item.model]);
    // });

    coolersData.forEach((item) => {
      worksheet.addRow([
        item["Código enfriador"],
        item["Mac"],
        item["Modelo"],
        item["Última visita"],
        item["Punto de venta"],
        item["Región"],
        item["Ruta"],
      ]);
    });

    worksheet.columns.forEach((column) => {
      if (column && column.eachCell) {
        let max = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          max = Math.max(max, cell.value ? cell.value.toString().length : 0);
        });
        column.width = max < 10 ? 10 : max;

        column.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    const blob = await workbook.xlsx.writeBuffer();

    const excelBlob = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const excelUrl = URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]; // Fecha formato "AAAA-MM-DD"
    const fileName = `Enfriadores_${dateString}.xlsx`;

    link.href = excelUrl;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(excelUrl);

    setIsDownloading(false);
  };

  ///////////////////// ordenar registros desc a asc (última visita)
  // CON BOTON DE OPCION normal / desc- asc

  // const [sortOrder, setSortOrder] = useState("asc");

  // const sortCoolersByLastVisit = (order) => {
  //   const sortedCoolers = [...coolersData];

  //   sortedCoolers.sort((a, b) => {
  //     const dateA = new Date(a["Última visita"]).getTime();
  //     const dateB = new Date(b["Última visita"]).getTime();

  //     if (order === "asc") {
  //       return dateA - dateB;
  //     } else {
  //       return dateB - dateA;
  //     }
  //   });

  //   setCoolersData(sortedCoolers);
  // };

  // const handleSortByLastVisit = () => {
  //   const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
  //   setSortOrder(newSortOrder);
  //   sortCoolersByLastVisit(newSortOrder);
  // };

  //----ordenar registros desc a asc (última visita)
  useEffect(() => {
    sortCoolersByLastVisit("desc"); // Cambia "asc" a "desc" para ordenar
  }, [coolersData]);

  const sortCoolersByLastVisit = (order) => {
    const sortedCoolers = [...coolersData];

    sortedCoolers.sort((a, b) => {
      const dateA = new Date(a["Última visita"]).getTime();
      const dateB = new Date(b["Última visita"]).getTime();

      if (order === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setCoolersData(sortedCoolers);
  };

  // BUSCAR ENFRIADOR POR SERIE O POR MAC
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    const hasNoInfoToShow = !coolersData.some((item) => {
      const codeEnfriador = item["Código enfriador"].toLowerCase();
      const mac = item["Mac"].toLowerCase();
      return (
        codeEnfriador.includes(query.toLowerCase()) ||
        mac.includes(query.toLowerCase())
      );
    });

    setNoInfoToShow(hasNoInfoToShow);
  };

  const filteredData = coolersData.filter((item) => {
    const searchString = searchQuery.toLowerCase();
    const codeEnfriador = item["Código enfriador"].toLowerCase();
    const mac = item["Mac"].toLowerCase();

    // You can add more fields to search if needed

    return codeEnfriador.includes(searchString) || mac.includes(searchString);
  });
  const coolersSizeFormatted = filteredData.length.toLocaleString();

  // Mensaje de sin información para mostrar

  const [noInfoToShow, setNoInfoToShow] = useState(false);

  return (
    <div>
      <Page
        current="Enfriadores"
        paths={[{ name: "Consola", to: "/" }]}
        view=""
        controls={[]}
      >
        <Card>
          <TextInput
            placeholder="Buscar enfriador"
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
            onChange={handleSearchInputChange}
            rightSection={
              <Tooltip label="Descargar Excel" position="left">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: isDownloading ? "not-allowed" : "pointer",
                  }}
                  onClick={isDownloading ? undefined : downloadExcel}
                >
                  {isDownloading ? (
                    <Loader size="md" />
                  ) : (
                    <IconDownload size={14} />
                  )}
                </div>
              </Tooltip>
            }
          />
          <br></br>
          <Text style={{ textAlign: "left" }}>
            {coolersSizeFormatted} enfriadores
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
                  <center>
                    Última visita
                    {/* <button onClick={handleSortByLastVisit}>
                      {sortOrder === "asc" ? "↓" : "↑"}
                    </button> */}
                  </center>
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
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    <Loader size="md" color="#ff4c8c" />
                  </td>
                </tr>
              ) : noInfoToShow ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No hay infromación para mostrar
                  </td>
                </tr>
              ) : (
                filteredData.map(
                  (
                    item,
                    index // Display filtered data
                  ) => (
                    <tr key={index}>
                      <td>{item["Código enfriador"]}</td>
                      <td>{item["Mac"]}</td>
                      <td>{item["Modelo"]}</td>
                      <td>{item["Última visita"]}</td>
                      <td>{item["Punto de venta"]}</td>
                      <td>{item["Región"]}</td>
                      <td>{item["Ruta"]}</td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </Table>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Select
              style={{ width: "90px" }}
              value={itemsPerPage.toString()}
              onChange={handleItemsPerPageChange}
              data={["100", "200", "300"]}
            />
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              total={totalPages}
            />
          </div>
        </Card>
      </Page>
    </div>
  );
}
