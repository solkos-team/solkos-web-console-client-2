import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import * as XLSX from "xlsx";

const UploadExcel = ({ onFileLoaded }) => {
  const handleUpload = (file) => {
    const isExcel =
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (!isExcel) {
      message.error("Solo puedes cargar archivos Excel");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        if (target.result instanceof ArrayBuffer) {
          const data = new Uint8Array(target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convierte la hoja en un arreglo de objetos usando la primera fila como encabezado
          const sheetData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
            header: 1,
          });

          // Obtén los encabezados de la primera fila
          const headers: string[] = sheetData[0];

          // Mapea las filas restantes a objetos utilizando los encabezados, ignorando las filas vacías
          const dataObjects = sheetData
            .slice(1)
            .filter((row: any[]) => row.length > 0)
            .map((row: any[]) => {
              const obj: { [key: string]: any } = {};
              row.forEach((cell, index) => {
                obj[headers[index]] = cell;
              });
              return obj;
            });

          // Muestra el contenido del archivo como objetos
          // console.log("Contenido del archivo (objetos):", dataObjects);

          // Llama a la función onFileLoaded con los datos del archivo
          if (onFileLoaded) {
            onFileLoaded(dataObjects);
          }
        } else {
          message.error("Error al leer el archivo.");
        }
      }
    };
    reader.readAsArrayBuffer(file);

    return false;
  };

  return (
    <Upload beforeUpload={handleUpload}>
      <Button style={{ color: "#2393F4", fontSize: "0.8rem", fontWeight: 400 }}>
        CARGAR ARCHIVOS +
      </Button>
    </Upload>
  );
};

export default UploadExcel;
