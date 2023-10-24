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

export default function Users() {
  return (
    <Page
      current="Colaboradores"
      paths={[{ name: "Consola", to: "/" }]}
      view=""
      controls={[]}
    >
      <Card>
        <TextInput
          placeholder="Buscar colaborador"
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
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th />
              </tr>
            </thead>
          </Table>
        </div>
      </Card>
    </Page>
  );
}
