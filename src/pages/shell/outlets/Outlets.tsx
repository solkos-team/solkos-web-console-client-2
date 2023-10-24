import React from "react";
import Page from "../../../components/page";
import {
  Card,
  TextInput,
  LoadingOverlay,
  Table,
  Pagination,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function Outlets() {
  return (
    <Page
      current="Puntos de venta"
      paths={[{ name: "Consola", to: "/" }]}
      view=""
      controls={[]}
    >
      <Card>
        <TextInput
          placeholder="Buscar punto de venta"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
        />
        <div style={{ position: "relative" }}>
          <Table
            verticalSpacing={"xs"}
            horizontalSpacing={"xs"}
            captionSide={"bottom"}
            highlightOnHover
          >
            <thead>
              <tr>
                <th>Código punto de venta</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Región</th>
                <th />
              </tr>
            </thead>
          </Table>
        </div>
      </Card>
    </Page>
  );
}
