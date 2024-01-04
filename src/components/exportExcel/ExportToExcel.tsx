import React from 'react'
import { Group, Button } from '@mantine/core';
import { IconDownload} from '@tabler/icons-react';
import * as XLSX from 'xlsx/xlsx'

export const ExportToExcel = (props) => {
    const exportToExcel = () =>{
        let wb = XLSX.utils.book_new()
        let ws = XLSX.utils.json_to_sheet(props.datos)
        XLSX.utils.book_append_sheet(wb,ws,'MySheet')
        XLSX.writeFile(wb,`${props.nombre || 'console2.0'}.xlsx`)
    }
    return (
        <Group>
            <Button style={{
                color: "#3E83FF",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "100%",
                backgroundColor:"transparent"}} onClick={exportToExcel}>Descargar&nbsp;<IconDownload size={20} /></Button>
        </Group>
    )
}
