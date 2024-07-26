// Funcion para traer la fecha de a cuerdo al mes
function getMonth(monthNumber: number,year:number) {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("El número de mes debe estar entre 1 y 12.");
    }
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const firstDay = new Date(year, monthNumber - 1, 1);
    const lastDay = new Date(year, monthNumber, 0);
    const firstDayString = firstDay.toISOString().split('T')[0];
    const lastDayString = lastDay.toISOString().split('T')[0];

    return {
        monthName: monthNames[monthNumber - 1],
        firstDay: firstDayString,
        lastDay: lastDayString
    };
}
const formatDrawerCoolview = () =>{
    const drawerElement = document.querySelector(
        ".mantine-Paper-root.mantine-Drawer-drawer.mantine-9zm2ny"
      ) as HTMLElement;
      if (drawerElement) {
        drawerElement.style.maxWidth = "98%";
        drawerElement.style.left = "67px";
      }
}
function obtenerFechas(mes, año) {
    // Validar mes y año
    if (mes < 1 || mes > 12) {
        throw new Error('El mes debe estar entre 1 y 12.');
    }

    // Obtener el último día del mes y año proporcionados
    const ultimoDia = new Date(año, mes, 0).getDate();
    const fechaUltimoDia = `${año}-${String(mes).padStart(2, '0')}-${ultimoDia}`;

    // Obtener el primer día del mes anterior
    let mesAnterior = mes - 1;
    let añoAnterior = año;
    if (mesAnterior === 0) {
        mesAnterior = 12;  // Si el mes es enero, el mes anterior es diciembre
        añoAnterior--;     // Restamos 1 al año
    }
    const fechaPrimerDiaMesAnterior = `${añoAnterior}-${String(mesAnterior).padStart(2, '0')}-01`;

    return [fechaUltimoDia, fechaPrimerDiaMesAnterior];
}
const updateTelemetriaStatus = (dateStat: Date | null | undefined,telemetriaStatus,setTelemetriaStatus) => {
    const isDateValid = dateStat !== null && dateStat !== undefined && dateStat.getFullYear()+1 !== 2000;
    if (telemetriaStatus !== isDateValid) {
      setTelemetriaStatus(isDateValid);
    }
  }
  // Funcion recibe dia mes y año , y retorna el mismo dia del mes anterior
  function getDates(day, month, year) {
    const baseDate = new Date(year, month - 1, day);
    const previousMonthDate = new Date(year, month - 2, day);
    if (month === 1) {
        previousMonthDate.setFullYear(year - 1);
        previousMonthDate.setMonth(11); 
    }
    return [
        baseDate.toISOString().split('T')[0],
        previousMonthDate.toISOString().split('T')[0]
    ];
}
export {getDates, getMonth ,formatDrawerCoolview,obtenerFechas,updateTelemetriaStatus}  