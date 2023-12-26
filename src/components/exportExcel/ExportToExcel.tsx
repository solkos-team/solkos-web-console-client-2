import React from 'react'
import { Group, Button } from '@mantine/core';
import { IconDownload} from '@tabler/icons-react';
import { CSVLink } from 'react-csv';

export const ExportToExcel = (props) => {
    return (
        <Group>
        <CSVLink data={props.datos} filename={props.nombre || 'console2.0'}>
                <Button >Descargar&nbsp;<IconDownload size={15} /></Button>
            </CSVLink>            
        </Group>
    )
}
