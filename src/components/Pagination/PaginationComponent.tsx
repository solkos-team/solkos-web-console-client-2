import React, { useState } from 'react'
import { Pagination, Select } from '@mantine/core'
import { Text } from '@mantine/core'
export const PaginationComponent = ({ accion, totalDatos, datosPorPagina, numero }) => {

  const [data, setData] = useState(["10","20","5"])
  const [value, setValue] = useState<string | null>("10");
  // const npage = Math.ceil(totalDatos/datosPorPagina)
  const npage = Math.ceil(totalDatos / datosPorPagina)
  const handlePageChange = (pageNum) => {
    accion(pageNum)
  }
  return (
    <section style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <Pagination total={npage} onChange={handlePageChange} />
      <Text>Registros por Pagina</Text>
      <div >
        <Select
        checked={true}
          // size="xs"
          radius="xl"          
          placeholder="Select placeholder"
          data={data}
          defaultValue={"10"}
          onChange={numero}
        />
      </div>
    </section>
  )
}
