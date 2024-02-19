import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import MapComponentPv from "../mapPv/MapPv";
import { Table } from "@mantine/core";
import { Drawer, Button } from "@mantine/core";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { fetchCoolers, fetchUniversal } from "../../utils/apiUtils";
import { CoolerInterface } from "../../interfaces/CoolerInterface";
import { PaginationComponent } from "../Pagination/PaginationComponent";
import { ExportToExcel } from "../exportExcel/ExportToExcel";
import { TextInput } from "@mantine/core";

export default function DrawerEnergy({ opened, onClose }) {
  const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [datosPorPagina, setNumero] = useState(50);
  const [searchValue, setSearchValue] = useState("");

  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const navigate = useNavigate();
  const dt = useSelector((state: any) => state.works);
  const dto = useSelector((state: any) => state.organization);
  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title=""
      position="right"
      size="40rem"
    >
      <>Energy</>
    </Drawer>
  );
}
