import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Skeleton } from "@mantine/core";

export const SkeletonTableOutlets = () => {
  const numRows = 7;
  const rowHeight = 60;

  const renderTableRow = (index) => {
    const isEvenRow = index % 2 === 0;

    return (
      <TableRow
        key={index}
        className={isEvenRow ? "Tabla Blanco" : "Tabla Gris"}
        style={{ height: `${rowHeight}px` }}
      >
        <TableCell
          style={{
            paddingRight: "30px",
            textAlign: "left",
            width: "220px",
          }}
        >
          <Skeleton height={30} mt={6} width="90%" />
        </TableCell>
        <TableCell
          style={{
            paddingRight: "30px",
            textAlign: "left",
            width: "90px",
          }}
        >
          <Skeleton height={30} mt={6} width="90%" />
        </TableCell>
        <TableCell
          style={{
            paddingLeft: "30px",
            textAlign: "center",
            width: "90px",
          }}
        >
          <Skeleton height={30} mt={6} width="90%" />
        </TableCell>
        <TableCell
          style={{
            paddingLeft: "60px",
            textAlign: "center",
            width: "90px",
          }}
        >
          <Skeleton height={30} mt={6} width="90%" />
        </TableCell>
        <TableCell
          style={{
            paddingLeft: "100px",
            textAlign: "center",
            width: "90px",
          }}
        >
          <Skeleton height={30} mt={6} width="90%" />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: "8000px",
          height: "400px",
        }}
      >
        <TableBody
          style={{
            display: "block",
            height: `${numRows * rowHeight}px`,
            minWidth: "900px",
            overflowY: "auto",
          }}
        >
          {[...Array(numRows)].map((_, index) => renderTableRow(index))}
        </TableBody>
      </Table>
    </>
  );
};
