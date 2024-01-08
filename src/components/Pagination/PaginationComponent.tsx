import React, { useState } from "react";
import { Pagination, Select } from "@mantine/core";
import { Text } from "@mantine/core";
export const PaginationComponent = ({
  accion,
  totalDatos,
  datosPorPagina,
  numero,
}) => {
  const [data, setData] = useState(["50", "100", "200"]);
  const [value, setValue] = useState<string | null>("50");
  // const npage = Math.ceil(totalDatos/datosPorPagina)
  const npage = Math.ceil(totalDatos / datosPorPagina);
  const handlePageChange = (pageNum) => {
    accion(pageNum);
  };
  return (
    <section style={{ display: "flex", flexDirection: "row",justifyContent:"flex-end", gap: "10px",marginTop:"16px" }}>
      <br />
      <Pagination total={npage} onChange={handlePageChange} />
      <br />
      <Text>Por Página</Text>
      <div>
        <Select
          checked={true}
          // size="xs"
          radius="md"
          placeholder="Select placeholder"
          data={data}
          defaultValue={"50"}
          onChange={numero}
          style={{
            width: "80px", // Establece el ancho deseado
          }}
        />
      </div>
    </section>
  );
};
