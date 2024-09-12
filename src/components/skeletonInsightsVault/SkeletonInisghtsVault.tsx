import React from "react";
import { Skeleton } from "@mantine/core";

export const SkeletonInsightsVault = () => {
  return (
    <>
      <Skeleton
        height={250}
        mt={2}
        width="100%"
        style={{ marginLeft: 1, borderRadius: "8px" }}
      />
    </>
  );
};
