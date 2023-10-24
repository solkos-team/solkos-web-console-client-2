import React from "react";
import Page from "../../../components/page";

export default function Panel() {
  return (
    <Page
      current="Panel"
      paths={[{ name: "Consola", to: "/" }]}
      view=""
      controls={[]}
    ></Page>
  );
}
