import React, { useState, useEffect } from 'react'

export const CoolView = () => {
    const [deviceId, setDeviceId] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const deviceIdParam = urlParams.get('device_id') || '';
        const dateFromParam = urlParams.get('date_from') || '';
        const dateToParam = urlParams.get('date_to') || ''; 
        setDeviceId(deviceIdParam);
        setDateFrom(dateFromParam);
        setDateTo(dateToParam);
    }, []);

    return (
        <iframe 
        src={`http://localhost:5173/`} 
        width='100%' 
        height='100%' 
        frameBorder='0'
        style={{marginTop:'-2rem',marginLeft:'-4rem'}}
        />
        // <iframe 
        // src={`https://solkos-data-viewer-b7agk5thba-uc.a.run.app/?device_id=${deviceId}&date_from=${dateFrom}&date_to=${dateTo}`} 
        // width='100%' 
        // height='100%' 
        // frameBorder='0'
        // />
    )
}
