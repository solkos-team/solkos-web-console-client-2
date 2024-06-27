// Funcion para traer la fecha de a cuerdo al mes
function getMonth(monthNumber: number) {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error("El número de mes debe estar entre 1 y 12.");
    }
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const firstDay = new Date(new Date().getFullYear(), monthNumber - 1, 1);
    const lastDay = new Date(new Date().getFullYear(), monthNumber, 0);
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
export { getMonth ,formatDrawerCoolview}  