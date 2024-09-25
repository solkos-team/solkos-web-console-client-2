import { CoolerData, CoolerInterface } from "../interfaces/CoolerInterface";


function vaultProces2RemoveDuplicades(coolers: CoolerInterface[]): CoolerInterface[] {
  const seenDeviceIds = new Set<string>();
  const uniqueCoolers: CoolerInterface[] = [];

  for (const cooler of coolers) {
    if (!seenDeviceIds.has(cooler.device_id)) {
      seenDeviceIds.add(cooler.device_id);
      uniqueCoolers.push(cooler);
    }
  }

  return uniqueCoolers;
}

const getBorderStyle = (cooler: CoolerData | undefined, dto: string): string => {
  if (!cooler) return "1.5px solid black";  
  const actionable = cooler.cooler.actionable 

  // Definir el mapa de estilos de borde basado en las acciones
  const borderStyles: { [key: string]: string } = {
    "Visita PdV": "1.5px solid #DA7E05",
    "Sin Riesgo": "1.5px solid #40C057",
    "SIN RIESGO": "1.5px solid #40C057",
    "Estatus sin venta": "1.5px solid #FA5252",
    "SIN VENTA": "1.5px solid #FA5252",
    "Acciones urgentes": "1.5px solid #FA5252",
    "SIN COINCIDENCIA": "1.5px solid #FA5252",
    "Actualizar Info": "1.5px solid #DA7E05",
    "Actualizar dato": "1.5px solid #1864AB",
    "Datos faltantes": "1.5px solid #1864AB",
    "Monitoreo": "1.5px solid #1864AB",
    "Movimiento": "1.5px solid #1864AB",
    "Solicitar serv. correctivo": "1.5px solid #E67700",
    "Solicitar serv. preventivos": "1.5px solid #E67700",
    "Seguimiento a equipo": "1.5px solid #E67700",
    "VISITA PDV PARA LECTURA": "1.5px solid #E67700",
    "Visita PdV prioritaria": "1.5px solid #C92A2A"
  };

  // Verificar la condición especial para "Visita PdV"
  if (actionable === "Visita PdV" && dto !== "KOF Colombia") {
    return borderStyles["Visita PdV"];
  }

  // Retornar el estilo basado en el mapa o el estilo por defecto
  return borderStyles[actionable] || "1.5px solid black";
};
const getBorderStyle2 = (cooler: any | undefined, dto: string): string => {
  if (!cooler) return "1.5px solid black";  
  const actionable = cooler 

  // Definir el mapa de estilos de borde basado en las acciones
  const borderStyles: { [key: string]: string } = {
    "Visita PdV": "1.5px solid #DA7E05",
    "Sin Riesgo": "1.5px solid #40C057",
    "SIN RIESGO": "1.5px solid #40C057",
    "Estatus sin venta": "1.5px solid #FA5252",
    "SIN VENTA": "1.5px solid #FA5252",
    "Acciones urgentes": "1.5px solid #FA5252",
    "SIN COINCIDENCIA": "1.5px solid #FA5252",
    "Actualizar Info": "1.5px solid #DA7E05",
    "Actualizar dato": "1.5px solid #1864AB",
    "Datos faltantes": "1.5px solid #1864AB",
    "Monitoreo": "1.5px solid #1864AB",
    "Movimiento": "1.5px solid #1864AB",
    "Solicitar serv. correctivo": "1.5px solid #E67700",
    "Solicitar serv. preventivos": "1.5px solid #E67700",
    "Seguimiento a equipo": "1.5px solid #E67700",
    "VISITA PDV PARA LECTURA": "1.5px solid #E67700",
    "Visita PdV prioritaria": "1.5px solid #C92A2A"
  };

  // Verificar la condición especial para "Visita PdV"
  if (actionable === "Visita PdV" && dto !== "KOF Colombia") {
    return borderStyles["Visita PdV"];
  }

  // Retornar el estilo basado en el mapa o el estilo por defecto
  return borderStyles[actionable] || "1.5px solid black";
};
const getColor = (cooler: CoolerData | undefined, dto: string): string => {
  if (!cooler) return "black";

  const actionable = cooler.cooler.actionable;

  // Definir el mapa de colores basado en las acciones
  const colorMap: { [key: string]: string } = {
    "Visita PdV": "#DA7E05",
    "Sin Riesgo": "#40C057",
    "SIN RIESGO": "#40C057",
    "Estatus sin venta": "#FA5252",
    "SIN VENTA": "#FA5252",
    "Acciones urgentes": "#FA5252",
    "SIN COINCIDENCIA": "#FA5252",
    "Actualizar Info": "#DA7E05",
    "Actualizar dato": "#1864AB",
    "Datos faltantes": "#1864AB",
    "Monitoreo": "#1864AB",
    "Movimiento": "#1864AB",
    "Solicitar serv. correctivo": "#E67700",
    "Solicitar serv. preventivos": "#E67700",
    "Seguimiento a equipo": "#E67700",
    "VISITA PDV PARA LECTURA": "#E67700",
    "Visita PdV prioritaria": "#C92A2A"
  };

  // Verificar la condición especial para "Visita PdV"
  if (actionable === "Visita PdV" && dto !== "KOF Colombia") {
    return colorMap["Visita PdV"];
  }

  // Retornar el color basado en el mapa o el color por defecto
  return colorMap[actionable] || "black";
};
const getColor2 = (cooler: any | undefined, dto: string): string => {
  if (!cooler) return "black";

  const actionable = cooler;

  // Definir el mapa de colores basado en las acciones
  const colorMap: { [key: string]: string } = {
    "Visita PdV": "#DA7E05",
    "Sin Riesgo": "#40C057",
    "SIN RIESGO": "#40C057",
    "Estatus sin venta": "#FA5252",
    "SIN VENTA": "#FA5252",
    "Acciones urgentes": "#FA5252",
    "SIN COINCIDENCIA": "#FA5252",
    "Actualizar Info": "#DA7E05",
    "Actualizar dato": "#1864AB",
    "Datos faltantes": "#1864AB",
    "Monitoreo": "#1864AB",
    "Movimiento": "#1864AB",
    "Solicitar serv. correctivo": "#E67700",
    "Solicitar serv. preventivos": "#E67700",
    "Seguimiento a equipo": "#E67700",
    "VISITA PDV PARA LECTURA": "#E67700",
    "Visita PdV prioritaria": "#C92A2A"
  };

  // Verificar la condición especial para "Visita PdV"
  if (actionable === "Visita PdV" && dto !== "KOF Colombia") {
    return colorMap["Visita PdV"];
  }

  // Retornar el color basado en el mapa o el color por defecto
  return colorMap[actionable] || "black";
};
const getStatusColor = (coolersData: CoolerData | undefined): string => {
  if (!coolersData?.cooler?.status) return "#C7CBD2";

  const status = coolersData.cooler.status;

  // Definir el mapa de colores basado en los estados
  const colorMap: { [key: string]: string } = {
    "FUNCIONANDO CORRECTAMENTE": "#B2F2BB",
    "FUNCIONANDO CON ALERTA": "#FFEC99",
    "EN FALLA": "#FFC9C9",
    "EN ESPERA DE SERVICIO": "#C7CBD2",
    "EN ESPERA DE LECTURA": "#A5D8FF",
    "SERVICIO NO EFECTIVO": "#FFC9C9",
    "SERVICIO IMPRODUCTIVO": "#FFC9C9",
    "SIN DATOS": "#C7CBD2"
  };

  // Retornar el color basado en el mapa o el color por defecto
  return colorMap[status] || "#C7CBD2";
};
const backgroundCircle = (coolersData: CoolerData | undefined): string => {
  if (!coolersData?.cooler?.status) return "#313A49";

  const status = coolersData.cooler.status;

  // Definir el mapa de colores basado en los estados
  const colorMap: { [key: string]: string } = {
    "FUNCIONANDO CORRECTAMENTE": "#2B8A3E",
    "FUNCIONANDO CON ALERTA": "#E67700",
    "EN FALLA": "#E03131",
    "EN ESPERA DE SERVICIO": "#313A49",
    "EN ESPERA DE LECTURA": "#1864AB",
    "SERVICIO NO EFECTIVO": "#E03131",
    "SERVICIO IMPRODUCTIVO": "#E03131",
    "SIN DATOS": "#313A49"
  };

  // Retornar el color basado en el mapa o el color por defecto
  return colorMap[status] || "#313A49";
};
// transformar datos a estructura correcta para la peticion
const vaultProces2TransformData = (array) => {
  return array.map(item => ({
      device_id: item.device_id,
      estatus: item.estatus
  }));
}
export { vaultProces2RemoveDuplicades,getBorderStyle,getColor,getStatusColor,backgroundCircle ,getBorderStyle2,getColor2,vaultProces2TransformData}