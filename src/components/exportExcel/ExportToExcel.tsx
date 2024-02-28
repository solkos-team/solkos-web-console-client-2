import React from "react";
import { Group, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import * as XLSX from "xlsx/xlsx";

export const ExportToExcel = (props) => {
  const exportToExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(props.datos);

    const columnWidths = props.datos.reduce((acc, row) => {
      Object.keys(row).forEach((key) => {
        const cellValue = String(row[key]);
        const cellLength = cellValue.length;
        const columnNameLength = String(key).length;

        acc[key] = Math.max(acc[key] || 0, cellLength, columnNameLength);
      });
      return acc;
    }, {});

    Object.keys(columnWidths).forEach((col, i) => {
      ws["!cols"] = ws["!cols"] || [];
      ws["!cols"][i] = { wch: columnWidths[col] };
    });

    XLSX.utils.book_append_sheet(wb, ws, "MySheet");
    XLSX.writeFile(
      wb,
      `${props.nombre || "console2.0"}_${formatDate(new Date())}.xlsx`
    );
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      "_" +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  };

  return (
    <Group>
      <Button
        disabled={
          props.datos === null ||
          props.datos.length === 0 ||
          props.datos === undefined
            ? true
            : false
        }
        style={{
          color: "#3E83FF",
          fontSize: "15px",
          fontStyle: "normal",
          fontWeight: 300,
          lineHeight: "100%",
          backgroundColor: "transparent",
        }}
        onClick={exportToExcel}
      >
        Descargar&nbsp;
        <IconDownload size={20} />
      </Button>
    </Group>
  );
};
