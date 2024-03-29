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

export const SkeletonMapInsights = () => {
  const numRows = 1;
  const rowHeight = 60;

  return (
    <>
      <Skeleton
        height="100%"
        mt={6}
        width="100%"        
      />
    </>
  );
};
