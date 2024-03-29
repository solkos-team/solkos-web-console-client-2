import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {IconNote,} from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import MapComponent from "../map";

async function validarExistenciaImagen(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });

    if (response.ok) {
    } else {
    }
  } catch (error) {
    console.error(
      "Error al intentar validar la existencia de la imagen:",
      error
    );
  }
}

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};

const ResumeCC = ({ coolersData, setTab }) => {
  const a = "../../sampleData/cooler_c.png";
  const b = "../../sampleData/buildings.png";
  const urlImagen = coolersData?.cooler?.asset_url;

  validarExistenciaImagen(urlImagen);

  const sortedTracking = coolersData?.tracking?.slice().sort((a, b) => {
    const dateA = new Date(a.notified_at).getTime();
    const dateB = new Date(b.notified_at).getTime();
    return dateB - dateA;
  });

  // *******************************************************
  const [nuevoComentario, setNuevoComentario] = useState<string>("");
  const [comentarios, setComentarios] = useState<string[]>([]);

  const handleComentarioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNuevoComentario(event.target.value);
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && nuevoComentario.trim() !== "") {
      const comentarioConFechaHora = `${nuevoComentario} - ${new Date().toLocaleString(
        "es-ES"
      )}`;
      setComentarios((prevComentarios) => [
        ...prevComentarios,
        comentarioConFechaHora,
      ]);
      setNuevoComentario("");
    }
  };

  const comentariosInvertidos = [...comentarios].reverse();

  // *******************************************************
  return (
    <>
      <br></br>
      <div style={{ display: "flex", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            padding: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid #88888B",
            width: "55%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <img src={"../../sampleData/actividad.png"} alt="cooler"></img>
            <div
              style={{
                color: "#3A3A3F",
                // fontFamily: "DM Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Actividad del enfriador
            </div>
          </div>
          {sortedTracking?.map((cooler, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                padding: "16px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                alignSelf: "stretch",
                borderRadius: "8px",
                borderLeft: "4px solid #3E83FF",
                background: "#EEF6FF",
              }}
            >
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "normal",
                }}
              >
                {cooler.algorithm === "Indicador de Riesgo Nivel: 0"
                  ? "Indicador: Sin riesgo"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 1"
                  ? "Indicador: Visitar punto de venta"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 2"
                  ? "Indicador: Requiere actualizar información"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 3"
                  ? "Indicador: Tomar acción urgente"
                  : cooler.algorithm === "Indicador de Riesgo Nivel: 4"
                  ? "Indicador: En riesgo"
                  : cooler.algorithm === "OWNED"
                  ? "Indicador: En propiedad"
                  : cooler.algorithm === "INSTALLED"
                  ? "Indicador: Instalado"
                  : cooler.algorithm === "LOCATION"
                  ? "Indicador: Ubicado"
                  : cooler.algorithm === "TELEMETRY"
                  ? "Indicador: Telemetría"
                  : cooler.algorithm === "COMPRESSOR_RUN_TIME_EXCEEDED_ALERT"
                  ? "Alerta: Alta demanda del compresor"
                  : cooler.algorithm === "LOW_VOLTAGE_ALERT"
                  ? "Alerta: Bajo voltaje"
                  : cooler.algorithm === "HIGH_VOLTAGE_ALERT"
                  ? "Alerta: Alto voltaje"
                  : cooler.algorithm === "MOVED_VISIT_ALERT"
                  ? "Alerta: Movimiento"
                  : cooler.algorithm === "HIGH_TEMPERATURE_ALERT"
                  ? "Alerta: Alta temperatura"
                  : cooler.algorithm === "DISCONNECTION_ALERT"
                  ? "Alerta: Desconexión"
                  : cooler.algorithm === "TEMPERATURE_FAIL"
                  ? "Falla de temperatura"
                  : cooler.algorithm === "COMPRESSOR_FAIL"
                  ? "Falla asociada al compresor"
                  : cooler.algorithm === "DISCONNECTIONS_FAIL"
                  ? "Falla de desconexión"
                  : cooler.algorithm === "VOLTAGE_FAIL"
                  ? "Falla de voltaje"
                  : cooler.algorithm === "FREEZING_FAIL"
                  ? "Falla de congelación"
                  : cooler.algorithm}
              </div>
              <div
                style={{
                  color: "#3E83FF",
                  // fontFamily: "DM Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                {formatCreatedAt(cooler.notified_at)}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            padding: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid #88888B",
            width: 440,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            <IconNote
              style={{
                width: "22px",
                height: "22px",
              }}
            />
            <div
              style={{
                color: "#3A3A3F",
                // fontFamily: "DM Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Notas
            </div>
          </div>

          <textarea
            value={nuevoComentario}
            onChange={handleComentarioChange}
            onKeyDown={handleEnterPress}
            style={{
              width: "100%",
              height: 100,
              marginTop: "16px",
              borderRadius: "4px",
              border: "1px solid #88888B",
              resize: "vertical",
            }}
            placeholder="Escribe tu comentario aquí..."
          />

          {/* Lista de comentarios */}
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: 0,
              marginTop: "16px",
            }}
          >
            {comentariosInvertidos.map((comentario, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid #88888B",
                  padding: "5px",
                  borderRadius: "4px",
                  marginTop: "8px",
                  fontSize: "14px",
                }}
              >
                {comentario}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            padding: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid #88888B",
            background: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              alignSelf: "stretch",
            }}
          >
            <img src={b} width={"24px"} alt="cooler"></img>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Acerca de la ubicación
              </div>
            </div>
          </div>
          {/* *** */}
          <div
            style={{
              display: "flex",
              padding: "8px 0px",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderBottom: "1px solid #CACACA",
            }}
          >
            <div
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Nombre del punto de venta
            </div>
            <div
              style={{
                color: "#88888B",
                textAlign: "right",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              {coolersData?.cooler?.outlet_name === "" ||
              coolersData?.cooler?.outlet_name == undefined
                ? "Sin registro"
                : coolersData?.cooler?.outlet_name}
              {"/"}
              {coolersData?.cooler?.outlet_id === "" ||
              coolersData?.cooler?.outlet_id == undefined
                ? "Sin registro"
                : coolersData?.cooler?.outlet_id}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 0px",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              borderBottom: "1px solid #CACACA",
            }}
          >
            <div
              style={{
                color: "#88888B",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              Dirección
            </div>
            <div
              style={{
                color: "#88888B",
                textAlign: "right",
                // fontFamily: "DM Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              {coolersData?.cooler?.outlet_address === "" ||
              coolersData?.cooler?.outlet_address == undefined
                ? "Sin registro"
                : coolersData?.cooler?.outlet_address}
            </div>
          </div>
          {/* ********** */}
          <Tabs
            color="teal"
            defaultValue="first"
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Tabs.List>
              <Tabs.Tab value="first">Mapa</Tabs.Tab>
              <Tabs.Tab value="second">Datos</Tabs.Tab>
            </Tabs.List>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
              }}
            >
              <Tabs.Panel value="first" pt="xs">
                <div
                  style={{
                    width: "95%",
                    height: "450px",
                    flexShrink: 0,
                    borderRadius: "8px",
                    border: "1px solid #CACACA",
                  }}
                >
                  <div>
                    <MapComponent
                      latitude={coolersData?.cooler?.latitude}
                      longitude={coolersData?.cooler?.longitude}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={"../../sampleData/filled.png"}
                      width={"100%"}
                      alt="cooler"
                    ></img>
                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Instalación
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={"../../sampleData/pin_filled.png"}
                      width={"24px"}
                      alt="cooler"
                    ></img>
                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Última ubicación
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {/* <IconCircleX /> */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px", // Espacio entre los bloques
                      }}
                    >
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                      &nbsp;
                      <div
                        style={{
                          width: "10px", // Ancho de cada bloque
                          height: "4px",
                          background: "#ED5079",
                        }}
                      ></div>
                    </div>

                    <div
                      style={{
                        color: "#88888B",
                        // fontFamily: "DM Sans",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Distancia entre puntos
                    </div>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="second" pt="xs">
                <div
                  style={{
                    // width: "500px",
                    display: "flex",
                    padding: "8px 0px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderBottom: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Instalación (Lat, Lon)
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      textAlign: "right",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    {"("}{" "}
                    {coolersData?.cooler?.latitude === ""
                      ? "Sin registro"
                      : coolersData?.cooler?.latitude}{" "}
                    {","}
                    {coolersData?.cooler?.longitude === ""
                      ? "Sin registro"
                      : coolersData?.cooler?.longitude}
                    {")"}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px 0px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderBottom: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Última posición (Lat, Lon)
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      textAlign: "right",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    {"("}{" "}
                    {coolersData?.cooler?.last_latitude === undefined ||
                    coolersData?.cooler?.last_longitude === null
                      ? "Sin registro"
                      : coolersData?.cooler?.last_latitude}
                    {","}
                    {coolersData?.cooler?.last_longitude} {")"}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px 0px",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    borderBottom: "1px solid #CACACA",
                  }}
                >
                  <div
                    style={{
                      color: "#88888B",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Distancia al punto de instalación
                  </div>
                  <div
                    style={{
                      color: "#88888B",
                      textAlign: "right",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    {coolersData?.cooler?.distance === undefined
                      ? "Sin registro"
                      : coolersData?.cooler?.last_latitude + "metros"}
                  </div>
                </div>
              </Tabs.Panel>
            </div>
          </Tabs>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column", // Ajusta la dirección a "column" para colocar los divs uno debajo del otro
            gap: "16px",
          }}
        >
          {/* ACERCA DEL EQUIPO */}
          <div
            style={{
              display: "flex",
              width: "380px",
              height: "450px",
              padding: "24px",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "8px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  alignSelf: "stretch",
                }}
              >
                <img
                  src={"../../sampleData/system1.png"}
                  width={"24px"}
                  alt="cooler"
                ></img>
                <div
                  style={{
                    color: "#3A3A3F",
                    // fontFamily: "DM Sans",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Acerca del equipo
                </div>
              </div>
              <div style={{ height: "290px", alignSelf: "stretch" }}>
                <img
                  src={"../../sampleData/cooler_c.png"}
                  width={"100%"}
                  alt="cooler"
                  onError={() => console.error("Error al cargar la imagen")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 0px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #CACACA",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Serie
                </div>
                <div
                  style={{
                    color: "#88888B",
                    textAlign: "left",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {coolersData?.cooler?.serial_number === "" ||
                  coolersData?.cooler?.serial_number == undefined
                    ? "Sin registro"
                    : coolersData?.cooler?.serial_number}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 0px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #CACACA",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  MAC
                </div>
                <div
                  style={{
                    color: "#88888B",
                    textAlign: "left",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {coolersData?.cooler?.device_id === "" ||
                  coolersData?.cooler?.device_id == undefined
                    ? "Sin registro"
                    : coolersData?.cooler?.device_id}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "8px 0px",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid #CACACA",
                }}
              >
                <div
                  style={{
                    color: "#88888B",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Modelo
                </div>
                <div
                  style={{
                    color: "#88888B",
                    textAlign: "left",
                    // fontFamily: "DM Sans",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  {coolersData?.cooler?.model_id === "" ||
                  coolersData?.cooler?.model_id == undefined
                    ? "Sin registro"
                    : coolersData?.cooler?.model_id}
                </div>
              </div>
            </div>
          </div>
          {/* Ordenes de servicios */}
          <div
            style={{
              display: "flex",
              padding: "24px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              borderRadius: "8px",
              border: "1px solid #88888B",
              width: 380,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
                alignSelf: "stretch",
              }}
            >
              <img src={"../../sampleData/commerce.png"} alt="cooler"></img>
              <div
                style={{
                  color: "#3A3A3F",
                  // fontFamily: "DM Sans",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Ordenes de servicio
              </div>
            </div>
            <div
              style={{
                display: "flex",
                padding: "16px",
                alignItems: "flex-start",
                gap: "16px",
                alignSelf: "stretch",
                borderRadius: "8px",
                border: "1px solid #CACACA",
                background: "#F4F4F4",
              }}
            >
              {/* ORDEN */}
              <div>
                {coolersData?.service_orders === null ||
                coolersData?.service_orders.length === 0 ? (
                  <>
                    <p style={{ marginLeft: 90, fontWeight: "bold" }}>
                      Sin ordenes de servicio
                    </p>
                  </>
                ) : (
                  coolersData?.service_orders && (
                    <div>
                      {coolersData.service_orders
                        .filter(
                          (order) =>
                            order.service_id === "1001" ||
                            order.service_id === "1002" ||
                            (order.service_id === "1005" &&
                              order.status === "D,D")
                        )
                        .map((order) => (
                          <>
                            <div key={order.id}>
                              <div
                                style={{
                                  display: "flex",
                                  padding: "16px",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: "4px",
                                  alignSelf: "stretch",
                                  borderRadius: "5px",
                                  background: "#FFF",
                                  boxShadow:
                                    "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
                                  width: "90%",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      flex: 100,
                                      color: "#000005",
                                      // fontFamily: "DM Sans",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      lineHeight: "normal",
                                      textAlign: "left",
                                    }}
                                  >
                                    Orden{" "}
                                    {order.id === ""
                                      ? "Sin registro"
                                      : order.id}
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "4px",
                                      borderRadius: "2px",
                                      background: "#D4DAE3",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "#313A49",
                                        // fontFamily: "Space Mono",
                                        fontSize: "10px",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "10px",
                                      }}
                                    >
                                      CERRADA
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    flex: 100,
                                    color: "#000005",
                                    // fontFamily: "DM Sans",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 400,
                                    lineHeight: "normal",
                                  }}
                                >
                                  $ (Sin registro)
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#3E83FF",
                                      // fontFamily: "Inter",
                                      fontSize: "14px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "normal",
                                    }}
                                  >
                                    {order.created_at === ""
                                      ? "Sin registro"
                                      : formatCreatedAt(order.created_at)}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    color: "#88888B",
                                    // fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "normal",
                                    textAlign: "left",
                                  }}
                                >
                                  {order.description === ""
                                    ? "Sin registro"
                                    : order.description}
                                </div>
                              </div>
                            </div>
                            <br></br>
                          </>
                        ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
};
export default ResumeCC;
