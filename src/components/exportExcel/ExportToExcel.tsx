import React, { useState } from "react";
import { Button,Menu, Badge,Loader } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import * as XLSX from "xlsx/xlsx";
import { fetchUniversalTables } from "../../utils/apiUtils";
import { useSelector } from "react-redux";

export const ExportToExcel = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPath, setIsLoadingPath] = useState(true);
  const dt = useSelector((state: any) => state.works);
  const [fileStateTotal,setFileState] = useState<string>()
  const [fileStateTotalPath,setFileStatePath] = useState<string>()
  const [total,setTotal] = useState<number>()
  const [totalPath,setTotalPath] = useState<number>()
  const typeRole = localStorage.getItem('Role')
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
   const pathVerify = () => {
     return dt.length == 0 ? [] : JSON.parse(dt);
   };
  
  const fetchData = async (path,setInfo,setLoad,setT) => {
    const body = {
      customer: props.body?.customer,
      class: props.body?.class,
      algorithm: props.body?.algorithm,
      path: path,
      page_size: -1,
      page_number: -1,
    };
    try {
      const data = await fetchUniversalTables(props.component, body,setLoad);      
      const URL_EXCEL_FILE = data.headers.get("pagination-url");
      const TOTAL_EXCEL_FILE = data.headers.get("pagination-count");
      setInfo(URL_EXCEL_FILE ? URL_EXCEL_FILE : '')
      setT(Number(TOTAL_EXCEL_FILE))
      setLoad(false);      
    } catch (error) {
      console.error("Error", error);
    }
  };
  const getData = () =>{ 
     if(pathVerify()){
       fetchData([],setFileState,setIsLoading,setTotal)
     }
     if(pathVerify().length > 0 ){
      fetchData(pathVerify(),setFileStatePath,setIsLoadingPath,setTotalPath)
     }
  }
  return (
    <Menu shadow="md" width={230}>
      <Menu.Target>
        <Button
        onClick={()=>{props.component != undefined || props.body != undefined ? getData() : ''}}
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
            visibility : props.datos === null ||
            props.datos.length === 0 ||
            props.datos === undefined
            ? 'hidden'
            : 'visible'
          }}>Descargar&nbsp;
          <IconDownload size={20} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Descarga de Información</Menu.Label>
        {/* <Menu.Item onClick={(e) => download(e)}> */}
        <Menu.Item style={{display: props.component == undefined || props.body == undefined || typeRole == 'path_user' ? "none" : ''}}>
          {isLoading == true 
          ? <>Cargando datos... <Loader color="blue" size="xs" /></>
          : <a style={{color:"#000"}} href={fileStateTotal} download>
            Todos los datos <Badge >{total?.toLocaleString("en-US")}</Badge>
            </a>}                    
        </Menu.Item>
        <Menu.Item style={{display: pathVerify().length > 0 && props.component != undefined  ? '' : 'none'}}>
          {isLoadingPath == true 
          ? <>Cargando datos... <Loader color="blue" size="xs" /></>
          : <a style={{color:"#000"}} href={fileStateTotalPath} download>
            Datos conforme filtro <Badge >{totalPath?.toLocaleString("en-US")}</Badge>
            </a>}                    
          {/* Vista Actual<Badge size="sm">{props.datos.lenght}</Badge> */}
        </Menu.Item>
        <Menu.Item style={{display: props.component != undefined ? '' : ''}} onClick={exportToExcel}>
          Datos actuales
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};


{/* <Group>
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
</Group> */}