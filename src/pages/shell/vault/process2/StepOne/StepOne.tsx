import React, { useEffect, useRef, useState } from "react";
import { TagInput } from "rsuite";
import { ButtonNext } from "../../Components/ButtonNext";
import { ButtonBack } from "../../Components/ButtonBack";
import { RoadMap } from "../../Components/RoadMap";
import { Button, Skeleton, Switch } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DrawerVault } from "../../Components/DrawerVault";
import { InsightsVault } from "../../Components/InsightsVault";
import { fetchUniversal, fetchUniversalVault } from "../../../../../utils/apiUtils";
import { CoolerInterface } from "../../../../../interfaces/CoolerInterface";
import { useSelector } from "react-redux";
import { pathVerify } from "../../../../../Functions/pathVerify";
import moment from "moment";

export const StepOne = ({
  active,
  setActive,
  nextStep,
  prevStep,
  coolersToChange,
  setCoolersToChange,
  coolersData,
  setCoolersData,
}) => {
  // const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  // const [coolersToChange,setCoolersToChange] = useState<CoolerInterface[]>([])
  const [coolerDrawer, SetCoolerDrawer] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [visibilityTable, setVisibilityTable] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);

  const handleTagChange = (newTags) => {
    setTags(newTags);
  };

  const body = {
    customer: dto,
    path: pathVerify(),
    page_number: pageNumber,
    page_size: 25,
    filter_by : tags
  };
  const fetchData = async () => {
    try {
      const data = await fetchUniversalVault("vaultlist", body, setIsLoading);
      setIsLoading(false);
      data != null
         ? setCoolersData((prevData) => [...prevData, ...data])
         : setCoolersData(undefined);
      setCoolersData(data)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    visibilityTable == true ? fetchData() : "";
  }, [visibilityTable, pageNumber]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      }
    };
    const container: any = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const handleSwitchChange = (index: number, data: any) => {
    setCoolersToChange((prevData) => [...prevData, data]);
    setCoolersData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].estatus = !updatedData[index].estatus;
      return updatedData;
    });
  };

  useEffect(() => {
    if (!opened) {
      SetCoolerDrawer(undefined);
    }
  }, [opened]);  
  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        display: active <= 1 ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        gap:'0.5rem'
      }}
    >
      {/* Seccion RoadMap */}
      <section style={{width:'100%',height:'28%',background:'',display:'flex',alignItems:'center'}}>
      {visibilityTable == false ? (
        <section style={{ width: "100%", display: "flex",height:'100%' }}>
          <InsightsVault activateSkeleton={true} />
        </section>
      ) : (
        <section style={{width:'100%',height:'max-content',background:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <RoadMap
            active={active}
            setActive={setActive}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </section>
      )}
      </section>
      {/* Seccion Buscador */}
      <section
        style={{
          width: "100%",
          height: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap:'0.5rem'
        }}
      >
        <img
          src={"../../sampleData/logovault.svg"}
          alt="Descripción de la imagen"
          style={{ width: "5rem", height: "33%",marginTop:'-0.25rem' }}
        />
        <div className="vault_tag" style={{height:'33%'}}>
          <TagInput
            value={tags}
            trigger={["Enter", "Space", "Comma"]}
            onChange={handleTagChange}
            // onKeyDown={handleKeyDown}
            placeholder="Buscar por Serie o Mac"
            style={{
              fontSize: "0.8rem",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "1.8rem",
              width: "100%",
              paddingRight: "10rem",
              borderRadius: "4px",
              color: "#88888B",
              border: "1px solid #ccc",
              textAlign: "left",
            }}
          />
          <img
            src={"../../sampleData/searchC.svg"}
            alt="Descripción de la imagen"
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "15px",
              height: "15px",
              pointerEvents: "none",
              // opacity: tags.length ? "0" : "1",
            }}
          />
        </div>
        <section style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem',height:'33%' }}>
          <Button style={{color: "white",background: "#ED5079"}} disabled={tags.length === 0 ? true : false} onClick={()=>{ tags.length > 0 ? setVisibilityTable(!visibilityTable) :'' }} >Buscar Coolers</Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <text
              style={{
                color: "#ED5079",
                fontSize: ".9rem",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "28px",
                cursor: "pointer",
                marginRight: "5px", // Espacio entre el texto y la imagen
              }}
              onClick={() => setVisibilityTable((o) => !o)}
            >
              Ir a vista con tabla{"   "}
            </text>
            <img
              src={"../../sampleData/table.svg"}
              alt="Descripción de la imagen"
              style={{ width: "18px", height: "15px", marginTop: 6 }}
            />
          </div>
        </section>
      </section>
      {/* Seccion Tabla */}
      <section
        ref={containerRef}
        style={{
          height: "45vh", // 50% de la altura del viewport
          overflowY: "auto", // Agrega una barra de desplazamiento vertical si es necesario
          scrollbarWidth: "thin",
          visibility: visibilityTable == false ? "hidden" : "visible",
        }}
      >
        {coolersData == null || coolersData == undefined ? (
          <div style={{ width: "100%", color: "black" }}>Sin registros</div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                    zIndex: "1",
                  }}
                >
                  Vault
                </th>
                <th
                  scope="col"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                    zIndex: "1",
                  }}
                >
                  Serie
                </th>
                <th
                  scope="col"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                    zIndex: "1",
                  }}
                >
                  Modelo
                </th>
                <th
                  scope="col"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                    zIndex: "1",
                  }}
                >
                  Última Visita
                </th>
                <th
                  scope="col"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                    zIndex: "1",
                  }}
                >
                  Prioridad
                </th>
                <th
                  scope="col"
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "white",
                    zIndex: "1",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {coolersData == null || coolersData == undefined ? (
                <div style={{ width: "100%" }}>Sin registros</div>
              ) : (
                coolersData?.map((cooler, index) => (
                  <tr key={index}>
                    <td data-label="Vault">
                      <Switch
                        checked={cooler.last_marker}
                        onLabel="ON"
                        offLabel="OFF"
                        color="gray"
                        onChange={() => handleSwitchChange(index, cooler)}
                      />
                    </td>
                    <td data-label="Serie">
                      {isLoading == true ? (
                        <>
                          <Skeleton height={20} radius="sm" width="90%" />
                        </>
                      ) : cooler.serial_number == undefined ||
                        cooler.serial_number == "" ? (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--gray-6, #868E96)",
                            fontWeight: "400",
                          }}
                        >
                          {"Sin registro"}
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--gray-6, #868E96)",
                              fontWeight: "400",
                            }}
                          >
                            {cooler.serial_number}
                          </div>
                        </>
                      )}
                    </td>
                    <td data-label="Modelo">
                      {isLoading == true ? (
                        <>
                          <Skeleton height={20} radius="sm" width="90%" />
                        </>
                      ) : cooler.model_id == undefined ||
                        cooler.model_id == "" ? (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--gray-6, #868E96)",
                            fontWeight: "400",
                          }}
                        >
                          {"Sin registro"}
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--gray-6, #868E96)",
                              fontWeight: "400",
                            }}
                          >
                            {cooler.model_id}
                          </div>
                        </>
                      )}
                    </td>
                    <td data-label="Última Visita">
                      {isLoading == true ? (
                        <>
                          <Skeleton height={20} radius="sm" width="90%" />
                        </>
                      ) : cooler.last_read == undefined ||
                        cooler.last_read == "" ? (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--gray-6, #868E96)",
                            fontWeight: "400",
                          }}
                        >
                          {"Sin registro"}
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--gray-6, #868E96)",
                              fontWeight: "400",
                            }}
                          >
                            {moment(new Date(cooler?.last_read)).format(
                              "DD/MM/YYYY"
                            )}
                          </div>
                        </>
                      )}
                    </td>
                    <td data-label="Prioridad">Prioridad</td>
                    <td data-label="Acciones">
                      <div
                        style={{
                          color: "var(--blue-6, #2393F4)",
                          fontSize: "0.8rem",
                          fontStyle: "normal",
                          fontWeight: 400,
                          display: "flex",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          open();
                          SetCoolerDrawer(cooler.serial_number);
                        }}
                      >
                        Ver más
                        <IconArrowRight
                          style={{
                            color: "#3E83FF",
                            width: "1.0rem",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
      {/* Seccion botones */}
      <section className="section_Vault_Buttons">
        <ButtonBack prevStep={prevStep} active={active} />
        <ButtonNext nextStep={nextStep} active={coolersToChange.length == 0 ? false : true} />
      </section>
      <DrawerVault opened={opened} onCLose={close} Serial_ID={coolerDrawer} />
    </section>
  );
};
