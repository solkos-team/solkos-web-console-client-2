import React from "react";
import { Skeleton } from "@mantine/core";

export const SkeletonCards = () => {
  const numRows = 1;
  const rowHeight = 60;

  return (
    <>
      <Skeleton
        height={180}
        mt={2}
        width="260px"
        style={{ marginLeft: 1, borderRadius: "8px" }}
      />
      <Skeleton
        height={180}
        width="260px"
        style={{ marginLeft: 10, borderRadius: "8px" }}
      />
      <Skeleton
        height={180}
        mt={2}
        width="260px"
        style={{ marginLeft: 10, borderRadius: "8px" }}
      />
      <Skeleton
        height={180}
        width="260px"
        style={{ marginLeft: 1, borderRadius: "8px" }}
      />
      <Skeleton
        height={180}
        width="260px"
        style={{ marginLeft: 10, borderRadius: "8px" }}
      />
      <Skeleton
        height={180}
        width="260px"
        style={{ marginLeft: 10, borderRadius: "8px" }}
      />
    </>
  );
};
