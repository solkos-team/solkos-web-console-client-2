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

export const SkeletonTableInsights = () => {
  const numRows = 5;
  const rowHeight = 60;

  const renderTableRow = (index) => {
    const isEvenRow = index % 2 === 0;

    return (
      <TableRow
        key={index}
        className={isEvenRow ? "Tabla Blanco" : "Tabla Gris"}
        style={{ height: `${rowHeight}px` }}
      >
        {[...Array(6)].map((_, cellIndex) => (
          <TableCell
            key={cellIndex}
            style={{
              paddingRight: "30px",
              textAlign: "left",
              width: "55px",
            }}
          >
            <Skeleton height={30} mt={6} width="90%" />
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <>
      <Table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: "1000px",
          height: "100px",
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
