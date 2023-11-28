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

export default function Outlets() {
  return (
    <div>
      <PageFilter />
      <br></br>
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
          Cooler Insights
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
          Haz el seguimiento de los enfriadores que tienen una alerta de
          funcionamiento.
        </div>
      </div>
    </div>
  );
}
