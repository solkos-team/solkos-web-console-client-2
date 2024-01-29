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

export const SkeletonInsights = () => {
  const numRows = 4;
  const rowHeight = 60;

  const renderTableRow = (index) => {
    const isEvenRow = index % 2 === 0;

    return (
      <TableRow key={index} style={{ height: `${rowHeight}px` }}>
        <TableCell
          style={{
            paddingRight: "45px",
            textAlign: "left",
            width: 100,
          }}
        >
          <Skeleton height={30} mt={6} width="90%" />
        </TableCell>
        <TableCell
          style={{
            paddingRight: "30px",
            textAlign: "left",
            width: "70%",
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
          maxWidth: "100%",
        }}
      >
        <TableBody
          style={{
            display: "block",
            height: `100%`,
            minWidth: "100%",
            overflowY: "auto",
          }}
        >
          <TableCell
            style={{
              paddingBottom: "30px",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Skeleton height={40} mt={6} width="80%" />
          </TableCell>
          {[...Array(numRows)].map((_, index) => renderTableRow(index))}
        </TableBody>
      </Table>
    </>
  );
};
