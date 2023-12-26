import React from 'react'
import { Pagination } from '@mantine/core'

export const PaginationComponent = ({accion,totalDatos,datosPorPagina}) => {
  const npage = Math.ceil(totalDatos/datosPorPagina)
  const handlePageChange = (pageNum) => {
    accion(pageNum)
  }
  return (
    <section>
      <Pagination total={npage} onChange={handlePageChange}/>
    </section>
  )
}
