import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconSearch,
  IconArrowNarrowLeft,
  IconLock,
  IconChevronRight,
  IconCircleX,
  IconCirclePlus,
} from "@tabler/icons-react";
import { Text, Popover, Select } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addPath } from "../../app/works";
import { fetchPath } from "./getPath";
import { useStorage } from "reactfire";
import { fetchUniversal } from "../../utils/apiUtils";

export default function (props) {
  const dto = useSelector((state: any) => state.organization);
  const dispatch = useDispatch();
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);
  const [value, setValue] = useState<string | null>("");
  const [opened, setOpened] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);
  const [dataZone, setDataZone] = useState([[""]]);
  const [dataSelect, setDataSelect] = useState([
    "Region",
    "Zona",
    "Unidad Operativa",
    "Ruta",
  ]);
  const [data, setData] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [filterVisibility, setFilterVisibility] = useState<boolean>(true);
  const [customer, setCustomer] = useState(dto);
  const navigate = useNavigate();
  const checkVisibilityPath = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("PATH") || "[]");
    if (index >= 4 || data.length >= 4 || dataLocalStorage.length >= 4) {
      setFilterVisibility(false);
    } else {
      setFilterVisibility(true);
    }
  };
  const handleClick = () => {
    setMostrarVentanaEmergente(true);
  };

  const handleCloseVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
  };

  const clearPath = () => {
    setCustomer(dto);
    setData([]);
    dispatch(addPath());
    setIndex(0);
    getPaths();
    setValue("");
    checkVisibilityPath();
    localStorage.setItem("PATH", "");
  };
  const getPaths = async (dataLocalStorage?) => {
    dataLocalStorage === undefined ? (dataLocalStorage = []) : dataLocalStorage;
    const body = { customer: dto, path: dataLocalStorage };
    if (data.length < 4) {
      try {
        // const data = await fetchPath(dataLocalStorage);
        const data = await fetchUniversal("paths", body);
        const v1 = data === null ? [""] : data;
        // console.log(v1)
        //dataZone.push(data)
        dataZone.unshift(v1); // solucion path desde api
        checkVisibilityPath();
      } catch (error) {
        console.log("Error fetching path", error);
      }
    }
  };
  index == 0 ? getPaths() : "";
  dto === customer ? "" : clearPath();
  useEffect(() => {
    getPaths();
  }, []);
  // Ctrl + x
  useEffect(() => {
    dispatch(addPath());
    const storage = localStorage.getItem("PATH");
    if (storage == null) {
      localStorage.setItem("PATH", "");
    }
    setIndex(JSON.parse(storage || "[]").length);
    const dataLocalStorage: any = JSON.parse(
      localStorage.getItem("PATH") || "[]"
    );
    if (index >= 4 || data.length >= 4 || dataLocalStorage.length >= 4) {
      setFilterVisibility(false);
    }
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        setMostrarVentanaEmergente(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [statusDelete]);

  const ventanaEmergenteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    verSelectData(value);
    dispatch(addPath());
    const storedTodos = localStorage.getItem("PATH");
    const todoArr = storedTodos !== null ? JSON.parse(storedTodos || "[]") : [];
    setData(todoArr);
    checkVisibilityPath();
    const handleCloseOnOutsideClick = (event) => {
      if (
        mostrarVentanaEmergente &&
        ventanaEmergenteRef.current &&
        !ventanaEmergenteRef.current.contains(event.target)
      ) {
        handleCloseVentanaEmergente();
      }
    };

    // Agregar el event listener al cuerpo del documento
    document.body.addEventListener("click", handleCloseOnOutsideClick);

    // Remover el event listener al desmontar el componente
    return () => {
      document.body.removeEventListener("click", handleCloseOnOutsideClick);
    };
  }, [mostrarVentanaEmergente, value]);

  const verSelectData = (value) => {
    // Add new PATH
    if (value != "") {
      if (index >= 4 || data.length >= 4) {
        alert("Filtros excedidos");
        return;
      }
      if (index == 3) {
        setFilterVisibility(false);
        setStatusDelete(false);
      }
      setData((current) => [...current, value]);
      localStorage.setItem("PATH", JSON.stringify([...data, value]));
      setOpened(false);
      if (index != 3) {
        setIndex(index + 1);
        setStatusDelete(false);
      }
      setStatusDelete(false);
      setFilterVisibility(false);
    }
  };
  const deleteFilter = (i) => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("PATH") || "");
    dataLocalStorage.splice(i, 1);
    localStorage.setItem("PATH", JSON.stringify(dataLocalStorage));
    data.splice(i, 1);
    dataZone.splice(i, 1);
    setStatusDelete(!statusDelete);
    setIndex(data.length);
    if (i == 3) {
      setFilterVisibility(true);
    }
    setValue("");
    getPaths(data);
  };
  const getPath = ({ path }) => {
    return typeof path === "undefined" ? "" : path;
  };
  const validaUser = JSON.parse(localStorage.getItem("RO0T") || "")
  const bloqPath = (i) => {
    // i == data.length - 1 ? false : true;    
    // return i >= validaUser?.length ? false : true;
    if (validaUser.length == 0) {
      return i == data.length - 1 ? false : true;
    } else {
      return i >= validaUser?.length && i == data.length - 1 ? false : true;
    }
  };

  data.length > 0 ? getPaths(data) : "";
  return (
    <div>
      <div
        style={{
          display: "flex",
          // padding: "0px 32px",
          marginLeft: -35,
          alignItems: "center",
          gap: "32px",
          alignSelf: "stretch",
          marginTop: -30,
          maxWidth: "97%",
          // overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            strokeWidth: "0.5",
            border: "0.5px solid #ADBACC",
            borderRadius: "4px",
            cursor: "pointer",
            // boxSizing: "border-box",
            visibility: props.status == "false" ? "hidden" : "visible",
          }}
          onClick={() => {
            navigate(`/` + getPath(props));
          }}
        >
          <IconArrowNarrowLeft />
        </section>
        <div
          style={{
            display: "flex",
            padding: "4px",
            alignItems: "flex-start",
            gap: "8px",
            // flex: "100",
            border: "0.5px solid #ADBACC",
            width: "100%",
            borderRadius: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                border: "1px solid #ADBACC",
                background: "#D4DAE3",
                padding: "3px 7px",
              }}
            >
              <IconLock
                style={{
                  color: "#ADBACC",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  color: "#ADBACC",
                  // fontFamily: "Space Mono",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                {dto || "CLIENTE"}
              </Text>
            </div>
            <IconChevronRight
              style={{
                color: "#ADBACC",
                width: "16px",
                height: "16px",
                marginLeft: "3px",
              }}
            />
          </div>
          {data === null || data === undefined
            ? []
            : data.map((item, i) => (
              <div style={{ display: "flex", alignItems: "center" }} key={i}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "8px",
                    border: "1px solid #ADBACC",
                    padding: "3px 7px",
                    background: bloqPath(i) == false ? "" : "#D4DAE3",
                  }}
                  disabled={bloqPath(i)}
                  type="button"
                >
                  {bloqPath(i) == false ? (
                    <IconCircleX
                      style={{
                        color: "#313A49",
                        width: "16px",
                        height: "16px",
                        marginRight: "3px",
                        visibility:
                          bloqPath(i) == false ? "visible" : "hidden",
                      }}
                      onClick={() => {
                        deleteFilter(i);
                      }}
                      onClickCapture={(o) => !o}
                    />
                  ) : (
                    <IconLock
                      style={{
                        color: "#ADBACC",
                        width: "16px",
                        height: "16px",
                        marginRight: "3px",
                      }}
                    />
                  )}

                  <Text
                    style={{
                      // color: "#313A49",
                      // fontFamily: "Space Mono",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "14px",
                      textTransform: "uppercase",
                      userSelect: "none",
                      color: bloqPath(i) == false ? "#313A49" : "#ADBACC",
                    }}
                  >
                    {item}
                  </Text>
                </button>
                <IconChevronRight
                  style={{
                    color: "#ADBACC",
                    width: "16px",
                    height: "16px",
                    marginLeft: "3px",
                    visibility: i == 3 ? "hidden" : "visible",
                  }}
                />
              </div>
            ))}

          {/* ---------------------- */}
          {filterVisibility ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "3px 7px",
                }}
              >
                <IconCirclePlus
                  style={{
                    color: "#313A49",
                    width: "16px",
                    height: "16px",
                    marginRight: "3px",
                  }}
                  onClick={() => setOpened((o) => !o)}
                />
                <Popover
                  position="bottom"
                  withArrow
                  shadow="md"
                  opened={opened}
                  onClose={() => setOpened(false)}
                  onChange={(opened) => {
                    setOpened(opened);
                  }}
                >
                  <Popover.Target>
                    <Text
                      style={{
                        color: "#313A49",
                        // fontFamily: "Space Mono",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "14px",
                        textTransform: "uppercase",
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpened((o) => !o)}
                    >
                      AÑADIR FILTRO
                    </Text>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Select
                      label={`Selecciona la ${dataSelect[index]}`}
                      placeholder="Seleccionar"
                      searchable
                      defaultChecked
                      data={dataZone[index]}
                      // value={value}
                      onChange={setValue}
                      nothingFound="Dato no encontrado"
                    />
                  </Popover.Dropdown>
                </Popover>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "31px",
              strokeWidth: "0.5",
              border: "0.5px solid #ADBACC",
              borderRadius: "4px",
              visibility: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "1px 10px",
                alignItems: "center",
                gap: "10px",
                flex: "100",
              }}
              onClick={handleClick}
            >
              <IconSearch
                style={{
                  color: "#ADBACC",
                  width: "16px",
                  height: "16px",
                  marginRight: "3px",
                }}
              />
              <Text
                style={{
                  display: "flex",
                  color: "#ADBACC",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  textTransform: "uppercase",
                }}
              >
                Buscar
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  alignSelf: "stretch",
                  borderRadius: "2px",
                  background: "#D4DAE3",
                  padding: "4px",
                  marginLeft: "auto",
                }}
              >
                <div
                  style={{
                    color: "#313A49",
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "14px",
                  }}
                >
                  Ctrl + x
                </div>
              </div>
            </div>
          </div>

          {mostrarVentanaEmergente && (
            <div
              ref={ventanaEmergenteRef}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "16px",
                borderRadius: "4px",
                border: "1px solid #88888B",
                background: "#FFF",
                zIndex: 999,
                width: 300,
              }}
            >
              {/* Contenido de la ventana emergente */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    // padding: "4px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderRadius: "4px",
                    background: "#FFF",
                    width: 300,
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 100,
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        // padding: "1px 10px",
                        alignItems: "center",
                        gap: "10px",
                        flex: 100,
                        position: "relative", // Contenedor relativo
                        borderBottom: "1px solid #ADBACC",
                      }}
                    >
                      <input
                        type="text"
                        // value={searchValue}
                        // onChange={handleChange}
                        style={{
                          color: "#ADBACC",
                          // fontFamily: "DM Sans",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "28px",
                          width: 270,
                          border: "none", // Quitar el borde
                          outline: "none", // Quitar el contorno
                        }}
                        placeholder="Busca por..."
                      />
                      <img
                        src={"../../sampleData/filter.png"}
                        alt="Descripción de la imagen"
                        style={{
                          position: "absolute",
                          right: "10px",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "16px",
                      alignItems: "flex-start",
                      gap: "8px",
                      alignSelf: "stretch",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        borderRadius: "8px",
                        border: "1px solid #ADBACC",
                        background: "#D4DAE3",
                      }}
                    >
                      <img
                        src={"../../sampleData/filter.png"}
                        alt="Descripción de la imagen"
                      />
                      <Text
                        style={{
                          color: "#ADBACC",
                          // fontFamily: "Space Mono",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "14px",
                          userSelect: "none",
                        }}
                      >
                        CLIENTE
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
