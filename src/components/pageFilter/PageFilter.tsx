import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import {
  IconSearch,
  IconArrowNarrowLeft,
  IconLock,
  IconChevronRight,
  IconCircleX,
  IconCirclePlus,
} from "@tabler/icons-react";
import { Text, Popover, Select, Loader } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { addPath } from "../../app/works";
import { fetchUniversal, fetchSearchUniversal } from "../../utils/apiUtils";
import { Modal, Button } from "@mantine/core";
import { UniversalSearch } from "../universalSearch/UniversalSearch";

export default function (props) {
  const [dataSelectLoaded, setDataSelectLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [noMatchMessage, setNoMatchMessage] = useState("");
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  const dispatch = useDispatch();
  const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);
  const [value, setValue] = useState<string | null>("");
  const [opened, setOpened] = useState(false);
  const [statusDelete, setStatusDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataZone, setDataZone] = useState([[""]]);
  const [variableGuardada, setVariableGuardada] = useState<string | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleteAlertOpen2, setIsDeleteAlertOpen2] = useState(false);
  // const [dataSelect, setDataSelect] = useState([
  //   "Region",
  //   "Zona",
  //   "Unidad Operativa",
  //   "Ruta",
  // ]);

  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token de localStorage
        const token = localStorage.getItem("Token");

        const response = await fetch(
          "https://qa-test---universal-console-server-b7agk5thba-uc.a.run.app/hierachy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Añadir el token al encabezado
            },
            body: JSON.stringify({ customer: dto }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          // El resultado es directamente el array
          setDataSelect(result); // No necesitas acceder a result.data
          setDataSelectLoaded(true);
        } else {
          console.error("Error in response:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dto]);
  // console.log(dataSelect);
  // console.log(dataSelect.length);

  // const options = ["Región", "Zona", "Unidad Operativa", "Ruta"];
  // const dataSelect =
  //   dto === "HEINEKEN"
  //     ? options.filter((option) => option !== "Ruta")
  //     : dto === "ECO"
  //     ? options.filter((option) => option !== "Unidad Operativa")
  //     : options;
  const [data, setData] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [filterVisibility, setFilterVisibility] = useState<boolean>(true);
  const [customer, setCustomer] = useState(dto);
  const navigate = useNavigate();
  // const checkVisibilityPath = () => {
  //   const dataLocalStorage = JSON.parse(localStorage.getItem("PATH") || "[]");

  //   if (dto === "HEINEKEN" && pathVerify().length >= 3) {
  //     setFilterVisibility(false);
  //   } else if (dto === "HEINEKEN" && pathVerify().length < 3) {
  //     setFilterVisibility(true);
  //   } else if (pathVerify().length >= 4) {
  //     setFilterVisibility(false);
  //   } else {
  //     setFilterVisibility(true);
  //   }
  // };

  const checkVisibilityPath = () => {
    if (dataSelectLoaded && pathVerify().length >= dataSelect.length) {
      setFilterVisibility(false);
    } else {
      setFilterVisibility(true);
    }
  };

  // ****************************************************************

  const selectedArea = localStorage.getItem("selectedArea");

  const valorclic = selectedArea;

  // ****************************************************************

  const pathVerify = () => {
    return dt.length == 0 ? [] : JSON.parse(dt);
  };
  const handleClick = () => {
    setMostrarVentanaEmergente(true);
  };

  // console.log(pathVerify().length);

  useEffect(() => {
    if (dataSelectLoaded) {
      checkVisibilityPath();
    }
  }, [dataSelectLoaded, pathVerify().length, dataSelect.length]);

  const handleCloseVentanaEmergente = () => {
    setMostrarVentanaEmergente(false);
    setSearchValue("");
  };
  dataZone.length == 1 && pathVerify().length > 0
    ? dataZone.unshift(pathVerify())
    : "";
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
  const [status, setStatus] = useState(false);
  const getPaths = async (dataLocalStorage?) => {
    dataLocalStorage === undefined ? (dataLocalStorage = []) : dataLocalStorage;
    const body = { customer: dto, path: dataLocalStorage };
    if (data.length < dataSelect.length && opened == true && status == false) {
      setStatus(true);
      try {
        const data = await fetchUniversal("paths", body, setIsLoading);
        const v1 = data === null ? [""] : data;
        dataZone.unshift(v1); // solucion path desde api
        checkVisibilityPath();
        setIsLoading(false);

        // Establecer el mensaje en función de la longitud de los resultados
        setMultipleResultsMessage(data.length > 1 ? "" : "");
      } catch (error) {
        console.error("Error fetching path", error);
      }
    }
  };

  pathVerify().length === 0 ? getPaths() : "";
  dto === customer ? "" : clearPath();

  // console.log(pathVerify().length);
  // Ctrl + x
  useEffect(() => {
    dispatch(addPath());
    const storage = localStorage.getItem("PATH");
    if (storage === null) {
      localStorage.setItem("PATH", "");
    }
    setIndex(pathVerify().length);
    const dataLocalStorage: any = JSON.parse(
      localStorage.getItem("PATH") || "[]"
    );
    if (
      index >= dataSelect.length ||
      data.length >= dataSelect.length ||
      dataLocalStorage.length >= dataSelect.length
    ) {
      setFilterVisibility(false);
    }
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        // setMostrarVentanaEmergente(true);
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
    const todoArr = storedTodos != null ? JSON.parse(storedTodos || "[]") : [];
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

  // console.log(dt.length);
  const verSelectData = (value) => {
    if (variableGuardada !== "" && variableGuardada !== null) {
      const splitValues = variableGuardada
        .split(",")
        .map((item) => item.trim());
      setData(splitValues);
      localStorage.setItem("PATH", JSON.stringify(splitValues));
      setOpened(false);
      setValue("");
      setStatusDelete(false);
      setFilterVisibility(false);
      return;
    }

    if (value !== "") {
      // Asegurarse de que dataSelect está cargado antes de verificar
      if (dataSelectLoaded && index === dataSelect.length - 1) {
        setFilterVisibility(false);
        setStatusDelete(false);
      }

      setData((current) => [...current, value]);
      localStorage.setItem("PATH", JSON.stringify([...data, value]));
      setOpened(false);
      setValue("");

      if (index < dataSelect.length - 1) {
        // Dinámico basado en dataSelect.length
        setIndex(index + 1);
      }

      setStatusDelete(false);
      setFilterVisibility(false);
    }
  };

  useEffect(() => {
    if (variableGuardada) {
      verSelectData(variableGuardada);
      window.location.reload();
    }
  }, [variableGuardada]);

  const deleteFilter = (i) => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("PATH") || "");
    dataLocalStorage.splice(i, 1);
    localStorage.setItem("PATH", JSON.stringify(dataLocalStorage));
    data.splice(i, 1);
    dataZone.splice(i, 1);
    setStatusDelete(!statusDelete);
    setIndex(data.length);
    if (i === dataSelect.length - 1) {
      setFilterVisibility(true);
    }
    setValue("");
    getPaths(data);
  };
  const getPath = ({ path }) => {
    return typeof path === "undefined" ? "" : path;
  };
  const validaUser = JSON.parse(localStorage.getItem("RO0T") || "");
  const bloqPath = (i) => {
    if (props.disabledPath === true) {
      return Boolean("false");
    }
    props.disabledPath === true ? "false" : "";
    if (validaUser.length === 0) {
      return i === data.length - 1 || props.disabledPath === true
        ? false
        : true;
    } else {
      return (i >= validaUser?.length && i === data.length - 1) ||
        props.disabledPath === true
        ? false
        : true;
    }
  };
  data.length > 0 ? getPaths(data) : "";

  const [searchHistory, setSearchHistory] = useState<
    { searchItem: string; translatedItem: string }[]
  >([]);

  const addToHistory = (
    searchItem: string | undefined,
    foundItem: string,
    isSearch: boolean
  ) => {
    if (!searchItem) {
      return;
    }

    // Obtener la última palabra del searchItem
    const lastWord = searchItem.split(",").pop()?.trim() ?? "";

    const translatedItem =
      foundItem === "serial_number" || foundItem === "device_id"
        ? "Enfriador"
        : foundItem === "region"
        ? "Región"
        : foundItem === "zone"
        ? "Zona"
        : foundItem === "operative_unit"
        ? "Unidad operativa"
        : foundItem === "route"
        ? "Ruta"
        : foundItem === "outlet_name" || foundItem === "outlet_id"
        ? "PdV"
        : "";

    // Crear un nuevo historial con el nuevo objeto al principio
    const updatedHistory = [
      { searchItem: lastWord, translatedItem },
      ...searchHistory.filter((item) => item.searchItem !== lastWord),
    ];
    const limitedHistory = updatedHistory.slice(0, 5);

    // Actualizar el estado del historial
    setSearchHistory(limitedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(limitedHistory));
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const body = {
    search_value: searchValue,
    customer: dto,
  };

  const [multipleResultsMessage, setMultipleResultsMessage] = useState("");

  const translateFoundItem = (foundItem) => {
    return foundItem === "serial_number" || foundItem === "device_id"
      ? "Enfriador"
      : foundItem === "region"
      ? "Región"
      : foundItem === "zone"
      ? "Zona"
      : foundItem === "operative_unit"
      ? "Unidad operativa"
      : foundItem === "route"
      ? "Ruta"
      : foundItem === "outlet_name" || foundItem === "outlet_id"
      ? "PdV"
      : "";
  };

  const formatOptions = (data) => {
    return data.map((item) => {
      const foundItem = item.found_in;
      const coincidences = item.coincidence.split(",");
      // console.log(coincidences.length);

      const lastWords =
        foundItem === "region" ||
        foundItem === "zone" ||
        foundItem === "operative_unit" ||
        foundItem === "route"
          ? coincidences.length > 0
            ? coincidences
                .slice(-2)
                .map((coin) => coin.trim())
                .join(", ")
            : null
          : item.coincidence.trim();

      const translatedItem = translateFoundItem(foundItem);
      return { coincidence: lastWords, translatedItem };
    });
  };

  const createMultipleResultsMessage = (options) => {
    return options.map((opt, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px",
        }}
        onClick={() => handleHistoryItemClick2(opt)}
      >
        {opt.translatedItem === "Enfriador" ? (
          <img
            src={"../../sampleData/frid.svg"}
            alt="Descripción de la imagen"
            style={{
              width: "15px",
              height: "15px",
              verticalAlign: "middle",
              marginBottom: "2px",
              marginRight: "8px",
            }}
          />
        ) : opt.translatedItem === "PdV" ? (
          <img
            src={"../../sampleData/store.svg"}
            alt="Descripción de la imagen"
            style={{
              width: "15px",
              height: "15px",
              verticalAlign: "middle",
              marginBottom: "2px",
              marginRight: "8px",
            }}
          />
        ) : opt.translatedItem === "Región" ||
          opt.translatedItem === "Zona" ||
          opt.translatedItem === "Unidad operativa" ||
          opt.translatedItem === "Ruta" ? (
          <img
            src={"../../sampleData/path.svg"}
            alt="Descripción de la imagen"
            style={{
              width: "15px",
              height: "15px",
              verticalAlign: "middle",
              marginBottom: "2px",
              marginRight: "8px",
            }}
          />
        ) : (
          ""
        )}
        <span
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#000000",
            marginRight: "8px",
          }}
        >
          {opt.coincidence}
        </span>
        <span
          style={{
            color: "#CED4DA",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          - {opt.translatedItem}
        </span>
      </div>
    ));
  };

  const updateHistoryWithOptions = (options, searchHistory) => {
    const updatedHistory = options.map((option) => ({
      searchItem: option.coincidence,
      translatedItem: option.translatedItem,
    }));

    const uniqueHistory = updatedHistory.concat(
      searchHistory.filter(
        (item) =>
          !updatedHistory.some(
            (newItem) => newItem.searchItem === item.searchItem
          )
      )
    );
    return uniqueHistory.slice(0, 5);
  };

  const fetchToken = async (searchValueOverride) => {
    const searchValueToUse = searchValueOverride || searchValue;

    setIsLoading(true);
    try {
      const data = await fetchSearchUniversal(
        "https://qa-test---universal-console-server-b7agk5thba-uc.a.run.app/search",
        setIsLoading,
        { search_value: searchValueToUse.trim(), customer: dto }
      );

      if (data === null) {
        console.error("No se encontraron coincidencias.");
        setIsLoading(false);
        setIsDeleteAlertOpen2(true);
        return;
      }

      if (data.length === 1) {
        const { coincidence, found_in } = data[0];
        addToHistory(coincidence, found_in, true);
        handleSingleResult(coincidence, found_in);
      } else if (data.length > 1) {
        setModalOpened(true);
        setSearchValue("");

        const options = formatOptions(data);

        setMultipleResultsMessage(createMultipleResultsMessage(options));

        setSearchHistory(updateHistoryWithOptions(options, searchHistory));
      } else {
        console.log("No se encontraron resultados para la búsqueda.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSingleResult = (coincidence, found_in) => {
    if (
      !window.location.pathname.startsWith("/home/clt/") ||
      (found_in !== "region" &&
        found_in !== "zone" &&
        found_in !== "operative_unit" &&
        found_in !== "route")
    ) {
      if (found_in === "serial_number" || found_in === "device_id") {
        navigate(`/home/clt/${coincidence}`);
        setModalOpened(false);
      } else if (found_in === "outlet_name" || found_in === "outlet_id") {
        navigate(`/home/outlets?filter=${coincidence}`);
      } else if (
        found_in === "region" ||
        found_in === "zone" ||
        found_in === "operative_unit" ||
        found_in === "route"
      ) {
        setVariableGuardada(coincidence);
        addToHistory(coincidence, found_in, false);
      }
    } else {
      setIsDeleteAlertOpen(true);
    }
  };

  const handleHistoryItemClick = (item) => {
    setSearchValue(item.searchItem);
    setSearchValue("");

    // Obtener el último valor de item.searchItem
    const lastValue = item.searchItem.split(",").pop().trim();

    // Verificar en consola el valor seleccionado
    // console.log("Último valor seleccionado del historial:", lastValue);

    // Llamar a fetchToken con el último valor
    fetchToken(lastValue)
      .then((data) => {
        const foundString = data[0].found_in;

        if (
          !window.location.pathname.startsWith("/home/clt/") ||
          (foundString !== "region" &&
            foundString !== "zone" &&
            foundString !== "operative_unit" &&
            foundString !== "route")
        ) {
          if (foundString === "serial_number" || foundString === "device_id") {
            navigate(`/home/clt/${data[0].coincidence}`);
            setModalOpened(false);
          } else if (
            foundString === "outlet_name" ||
            foundString === "outlet_id"
          ) {
            navigate(`/home/outlets?filter=${item.searchItem}`);
            setModalOpened(false);
          } else if (
            foundString === "region" ||
            foundString === "zone" ||
            foundString === "operative_unit" ||
            foundString === "route"
          ) {
            setVariableGuardada(data[0].coincidence);
            addToHistory(data[0].coincidence, foundString, false);
            setModalOpened(false);
          }
        } else {
          setIsDeleteAlertOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleHistoryItemClick2 = (item) => {
    // Desestructuramos item y renombramos translatedItem a foundString
    const { coincidence, translatedItem: foundString } = item;

    // console.log("Opción seleccionada:", coincidence);

    // Dividir la cadena por comas y obtener el último elemento del array resultante
    const parts = coincidence.split(",");
    const lastPart = parts[parts.length - 1].trim(); // Obtener el último elemento y eliminar espacios en blanco alrededor

    setSearchValue(lastPart);

    fetchToken(lastPart)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].found_in) {
          const dataFoundString = data[0].found_in;

          if (
            !window.location.pathname.startsWith("/home/clt/") ||
            (dataFoundString !== "region" &&
              dataFoundString !== "zone" &&
              dataFoundString !== "operative_unit" &&
              dataFoundString !== "route")
          ) {
            if (
              dataFoundString === "serial_number" ||
              foundString === "device_id"
            ) {
              navigate(`/home/clt/${data[0].coincidence}`);
              setModalOpened(false);
            } else if (
              dataFoundString === "outlet_name" ||
              dataFoundString === "outlet_id"
            ) {
              navigate(`/home/outlets?filter=${coincidence}`);
              setModalOpened(false);
            } else if (
              dataFoundString === "region" ||
              dataFoundString === "zone" ||
              dataFoundString === "operative_unit" ||
              dataFoundString === "route"
            ) {
              setVariableGuardada(data[0].coincidence);
              addToHistory(data[0].coincidence, dataFoundString, false);
              setSearchValue("");
              setModalOpened(false);
            }
          } else {
            setIsDeleteAlertOpen(true);
          }
        } else {
          console.error("Los datos recibidos no son los esperados.");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchValue.trim() !== "") {
        setIsDeleteAlertOpen(false);
        setIsDeleteAlertOpen2(false);
        fetchToken(searchValue);
        setSearchValue("");
      } else {
        console.log("El campo de búsqueda está vacío");
      }
    }
  };

  const handleClick2 = () => {
    setMostrarVentanaEmergente(true);
  };

  const handleCloseVentanaEmergente2 = () => {
    setMostrarVentanaEmergente(false);
  };

  const ventanaEmergenteRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCloseOnOutsideClick = (event) => {
      if (
        mostrarVentanaEmergente &&
        ventanaEmergenteRef.current &&
        !ventanaEmergenteRef.current.contains(event.target)
      ) {
        handleCloseVentanaEmergente();
      }
    };
    document.body.addEventListener("click", handleCloseOnOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleCloseOnOutsideClick);
    };
  }, [mostrarVentanaEmergente]);

  const [modalOpened, setModalOpened] = useState(false);

  const handleClickTextInput = () => {
    setModalOpened(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "x") {
        event.preventDefault();
        setModalOpened(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleMouseEnter = (index: number) => {
    setSelectedItemIndex(index);
  };

  const historyItemStyles = (index: number) => ({
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor:
      index === selectedItemIndex ? "rgba(206, 212, 218, 0.5)" : "transparent",
  });

  useHotkeys([["ctrl+K", () => setModalOpened(true)]]);

  return (
    <div>
      <section
        className="pagefilter_return_principal"
        style={{
          marginLeft: props.menuResponsive == true ? "10px" : "-35px",
          marginTop: props.menuResponsive == true ? "1px" : "-30px",
        }}
      >
        <section
          className="return_principal"
          onClick={() => {
            localStorage.getItem("ORG") === "CALL CENTER"
              ? navigate(`/home/clt_callCenter/` + getPath(props))
              : navigate(`/home/` + getPath(props));
          }}
        >
          <IconArrowNarrowLeft color="black" />
        </section>
        <section
          className="pagefilter_container_principal"
          style={{ display: props.menuResponsive == true ? "none" : "" }}
        >
          <div className="pagefilter_container_items">
            <div className="pagefilter_container_principal_customer">
              <div className="pagefilter_container_principal_customer_container">
                <IconLock className="pagefilter_container_principal_customer_container_icon" />
                <Text className="pagefilter_container_principal_customer_container_text">
                  {dto || "CLIENTE"}
                </Text>
              </div>
              <IconChevronRight className="pagefilter_container_principal_customer_container_icon_right" />
            </div>
            {data === null || data === undefined
              ? []
              : data.map((item, i) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      scrollSnapAlign: "end",
                    }}
                    key={i}
                  >
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                        border: "1px solid #ADBACC",
                        padding: "3px 7px",
                        background: bloqPath(i) === false ? "" : "#D4DAE3",
                        backgroundColor:
                          bloqPath(i) === false ? "#D4DAE3" : "#D4DAE3",
                      }}
                      disabled={bloqPath(i)}
                      type="button"
                    >
                      {bloqPath(i) === false ? (
                        <IconCircleX
                          style={{
                            color: "#313A49",
                            width: "1rem",
                            height: "1rem",
                            marginRight: "3px",
                            visibility:
                              props.status == true || props.disabledPath == true
                                ? "hidden"
                                : "visible",
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

                          fontSize: "0.6rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "0.6rem",
                          textTransform: "uppercase",
                          userSelect: "none",
                          color: bloqPath(i) === false ? "#313A49" : "#ADBACC",
                        }}
                      >
                        {item}
                      </Text>
                    </button>
                    <IconChevronRight
                      style={{
                        color: "#ADBACC",
                        width: "0.9rem",
                        height: "0.9rem",
                        marginLeft: "3px",
                        visibility:
                          i == 3 || props.disabledPath == true
                            ? "hidden"
                            : "visible",
                      }}
                    />
                  </div>
                ))}

            {/* ---------------------- */}
          </div>
          {filterVisibility ? (
            <div
              style={{
                visibility:
                  props.status == true || props.disabledPath == true
                    ? "hidden"
                    : "visible",
              }}
              className="pagefilter_container_principal_addFilter"
            >
              <IconCirclePlus
                className="pagefilter_container_principal_addFilter_iconCircle"
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
                      fontSize: "0.6rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "0.7rem",
                      textTransform: "uppercase",
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpened((o) => !o);
                      setStatus(false);
                    }}
                  >
                    AÑADIR FILTRO
                  </Text>
                </Popover.Target>
                <Popover.Dropdown>
                  {isLoading == true ? (
                    <>
                      <Loader color="gray" size="xs" />
                    </>
                  ) : (
                    <Select
                      label={`Selecciona la ${dataSelect[pathVerify().length]}`}
                      placeholder="Seleccionar"
                      searchable
                      // defaultChecked
                      data={dataZone[0]}
                      // value={value}
                      onChange={setValue}
                      // nothingFound="Dato no encontrado"
                      dropdownPosition="flip"
                      styles={(theme) => ({
                        dropdown: {
                          width: 200, // Ajusta el ancho del dropdown
                          maxHeight: 300, // Ajusta la altura máxima
                          overflowY: "auto", // Habilita el desplazamiento vertical si el contenido excede maxHeight
                          position: "absolute", // Cambia la posición si es necesario
                          top: "100%", // Ajusta la posición según sea necesario
                          left: 0, // Ajusta la posición horizontal
                        },
                        item: {
                          width: 200, // Ancho de las opciones
                          padding: theme.spacing.xs, // Espacio interno
                          boxSizing: "border-box", // Incluye el padding en el ancho
                        },
                      })}
                    />
                  )}
                </Popover.Dropdown>
              </Popover>
            </div>
          ) : (
            ""
          )}
        </section>

        <UniversalSearch
          setModalOpened={setModalOpened}
          menuResponsive={props.menuResponsive}
        />

        <div>
          <section>
            {modalOpened && (
              <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                centered
                withCloseButton={false}
                size={props.menuResponsive == undefined ? "50%" : ""}
                // className="unisersal_search_principal"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    borderBottom: "1px solid #CED4DA",
                  }}
                >
                  <img
                    src={"../../sampleData/searchB.svg"}
                    alt="Descripción de la imagen"
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      left: "10px",
                      width: "15px",
                      height: "15px",
                      marginLeft: -10,
                      marginTop: -5,
                    }}
                  />
                  <input
                    id="searchInput"
                    placeholder="Buscar"
                    disabled={false}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      width: "100%",
                      paddingLeft: "30px",
                      paddingRight: "40px", // Incrementa el paddingRight para dejar espacio para el Loader
                      boxSizing: "border-box",
                      height: "40px",
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      marginTop: -15,
                    }}
                  />
                  {isLoading && ( // Si isLoading es verdadero, muestra el Loader
                    <Loader
                      color="gray"
                      size="xs"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "15px", // Posiciona el Loader a la derecha del TextInput
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                </div>
                <div style={{ marginTop: "10px" }}></div>

                {isDeleteAlertOpen2 ? (
                  <div style={{ padding: "16px", textAlign: "center" }}>
                    <img
                      src={"../../sampleData/search-off.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "22px", height: "22px" }}
                    />
                    <div
                      style={{
                        color: "#FA5252",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "155%",
                        fontSize: "14px",
                      }}
                    >
                      No se encontraron coincidencias, ingresa otro valor
                    </div>
                  </div>
                ) : isDeleteAlertOpen ? (
                  <div style={{ padding: "16px", textAlign: "center" }}>
                    <img
                      src={"../../sampleData/search-off.svg"}
                      alt="Descripción de la imagen"
                      style={{ width: "22px", height: "22px" }}
                    />
                    <div
                      style={{
                        color: "#FA5252",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "155%",
                        fontSize: "14px",
                      }}
                    >
                      No es posible buscar zona, región, unidad operativa o ruta
                      desde el CLT.
                    </div>
                  </div>
                ) : (
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {multipleResultsMessage !== "" ? (
                      <div style={{ padding: "16px", textAlign: "center" }}>
                        {/* <img
                     src={"../../sampleData/search-off.svg"}
                     alt="Descripción de la imagen"
                     style={{ width: "22px", height: "22px" }}
                   /> */}
                        <div
                          style={{
                            color: "#FA5252",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "155%",
                            fontSize: "14px",
                          }}
                        >
                          {multipleResultsMessage}
                        </div>
                      </div>
                    ) : (
                      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {searchHistory.map((item, index) => (
                          <div
                            key={index}
                            style={historyItemStyles(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onClick={() => handleHistoryItemClick(item)}
                          >
                            <div>
                              <div>
                                {item.translatedItem === "Enfriador" ? (
                                  <img
                                    src={"../../sampleData/frid.svg"}
                                    alt="Descripción de la imagen"
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      verticalAlign: "middle",
                                      marginBottom: "2px",
                                      marginRight: "8px",
                                    }}
                                  />
                                ) : item.translatedItem === "PdV" ? (
                                  <img
                                    src={"../../sampleData/store.svg"}
                                    alt="Descripción de la imagen"
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      verticalAlign: "middle",
                                      marginBottom: "2px",
                                      marginRight: "8px",
                                    }}
                                  />
                                ) : item.translatedItem === "Región" ||
                                  item.translatedItem === "Zona" ||
                                  item.translatedItem === "Unidad operativa" ||
                                  item.translatedItem === "Ruta" ? (
                                  <img
                                    src={"../../sampleData/path.svg"}
                                    alt="Descripción de la imagen"
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      verticalAlign: "middle",
                                      marginBottom: "2px",
                                      marginRight: "8px",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    color: "#000000",
                                    marginRight: "8px",
                                  }}
                                >
                                  {item.searchItem}
                                </span>
                                <span
                                  style={{
                                    color: "#CED4DA",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                  }}
                                >
                                  {" "}
                                  - {item.translatedItem}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Modal>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
