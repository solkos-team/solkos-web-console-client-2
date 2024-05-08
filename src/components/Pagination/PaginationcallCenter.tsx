import React, { useState } from "react";
import { Pagination, Select } from "@mantine/core";
import { Text } from "@mantine/core";
export const PaginationcallCenter = ({
  accion,
  totalDatos,
  datosPorPagina,
  numero,
}) => {
  const [data, setData] = useState(["25"]);
  const npage = Math.ceil(totalDatos / datosPorPagina);
  const handlePageChange = (pageNum) => {
    accion(pageNum);
  };
  return (
    <>
      <section
        className="principal_paginator"
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "flex-end",
        //   gap: "10px",
        //   marginTop: "16px",
        //   backgroundColor:"red"
        // }}
      >
        <br />
        <Pagination total={npage} onChange={handlePageChange} />
        <br />
        {/* <Text>Por Página</Text>
        <div>
          <Select
            checked={true}
            // size="xs"
            radius="md"
            placeholder="Selecciona el numero de items"
            data={data}
            defaultValue={"25"}
            onChange={numero}
            style={{
              width: "100px",
              fontSize: "12px", // Reducir el tamaño de la fuente
              padding: "4px 8px", // Reducir el espaciado dentro del componente
            }}
          />
        </div> */}
      </section>
    </>
  );
};
