import React, { useEffect, useRef, useState } from "react";
import { TagInput } from "rsuite";
import { ButtonNext } from "../../Components/ButtonNext";
import { ButtonBack } from "../../Components/ButtonBack";
import { RoadMap } from "../../Components/RoadMap";
import { Skeleton, Switch } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DrawerVault } from "../../Components/DrawerVault";
import { InsightsVault } from "../../Components/InsightsVault";
import { fetchUniversal } from "../../../../../utils/apiUtils";
import { CoolerInterface } from "../../../../../interfaces/CoolerInterface";
import { useSelector } from "react-redux";
import { pathVerify } from "../../../../../Functions/pathVerify";
import moment from "moment";

export const StepOne = ({ active, setActive, nextStep, prevStep ,coolersToChange,setCoolersToChange,coolersData, setCoolersData}) => {
  // const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  // const [coolersToChange,setCoolersToChange] = useState<CoolerInterface[]>([])
  const [coolerDrawer,SetCoolerDrawer] = useState<CoolerInterface[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [visibilityTable, setVisibilityTable] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([]);
  const [pageNumber,setPageNumber] = useState(1)
  const dto = useSelector((state: any) => state.organization);
  const dt = useSelector((state: any) => state.works);
  // if(visibilityTable == true){
  //   // @ts-ignore
  //   setActive(1)
  // }else{setActive(0)}  

  const handleTagChange = (newTags) => {
    setTags(newTags);
  };
  
  
  const body = { customer: dto, path: pathVerify(), page_number: pageNumber, page_size: 25 };
  const fetchData = async () => {
    try {
      const data = await fetchUniversal("vaultlist", body, setIsLoading);
      setIsLoading(false);
      setCoolersData(prevData => [...prevData, ...data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    visibilityTable == true ? fetchData() : ''
  }, [visibilityTable,pageNumber])
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight-1) {                    
          setPageNumber(prevPage => prevPage + 1);
        }
      }
    };
    const container:any = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  const handleSwitchChange = (index: number,data:any) => {
    // setCoolersToChange(prevData=>[...prevData,{device_id:data.device_id,estatus:data.estatus}])
    setCoolersToChange(prevData=>[...prevData,data])
    setCoolersData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].estatus = !updatedData[index].estatus;
      return updatedData;
    });
  };

  useEffect(() => {
    if (!opened) {
      SetCoolerDrawer([]);
    }
  }, [opened]);
  return (
    <section style={{ width: '100%', height: '100%', display: active <= 1 ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
      {/* Seccion RoadMap */}

      {
        visibilityTable == false
          ? <section style={{ width: '100%', display: 'flex' }}><InsightsVault /></section>
          : <section className="vault_section_roadmap">
            <RoadMap active={active} setActive={setActive} nextStep={nextStep} prevStep={prevStep} />
          </section>
      }
      {/* Seccion Buscador */}
      <section
        style={{
          width: "100%",
          height: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={"../../sampleData/logovault.svg"}
          alt="Descripción de la imagen"
          style={{ width: "5rem", height: "3rem" }}
        />
        <div className="vault_tag">
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px", // Espacio entre el botón y el texto con la imagen
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
      {/* Seccion Tabla */}
      <section
      ref={containerRef}
        style={{
          height: '50vh', // 50% de la altura del viewport
          overflowY: 'auto', // Agrega una barra de desplazamiento vertical si es necesario
          scrollbarWidth: 'thin',
          visibility: visibilityTable == false ? 'hidden' : 'visible',          
        }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}>
          <thead>
            <tr>
              <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>Vault</th>
              <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>Serie</th>
              <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>Modelo</th>
              <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>Última Visita</th>
              <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>Prioridad</th>
              <th scope="col" style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coolersData?.map((cooler, index) => (
              <tr key={index}>
                <td data-label='Vault'>
                  <Switch checked={cooler.estatus} onLabel="ON" offLabel="OFF" color="gray" onChange={() => handleSwitchChange(index,cooler)} />
                </td>
                <td data-label='Serie'>
                  {isLoading == true ? (
                    <>
                      <Skeleton height={20} radius="sm" width="90%" />
                    </>
                  ) : cooler.serial_number == undefined ||
                    cooler.serial_number == "" ? (
                    <div style={{ fontSize: "0.75rem", color: 'var(--gray-6, #868E96)', fontWeight: '400' }}>
                      {"Sin registro"}
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: "0.75rem", color: 'var(--gray-6, #868E96)', fontWeight: '400' }}>
                        {cooler.serial_number}
                      </div>
                    </>
                  )}
                </td>
                <td data-label='Modelo'>
                  {isLoading == true ? (
                    <>
                      <Skeleton height={20} radius="sm" width="90%" />
                    </>
                  ) : cooler.model_id == undefined ||
                    cooler.model_id == "" ? (
                    <div style={{ fontSize: "0.75rem", color: 'var(--gray-6, #868E96)', fontWeight: '400' }}>
                      {"Sin registro"}
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: "0.75rem", color: 'var(--gray-6, #868E96)', fontWeight: '400' }}>
                        {cooler.model_id}
                      </div>
                    </>
                  )}
                </td>
                <td data-label='Última Visita'>
                  {isLoading == true ? (
                    <>
                      <Skeleton height={20} radius="sm" width="90%" />
                    </>
                  ) : cooler.last_read == undefined ||
                    cooler.last_read == "" ? (
                    <div style={{ fontSize: "0.75rem", color: 'var(--gray-6, #868E96)', fontWeight: '400' }}>
                      {"Sin registro"}
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: "0.75rem", color: 'var(--gray-6, #868E96)', fontWeight: '400' }}>
                        {moment(new Date(cooler?.last_read)).format(
                          "DD/MM/YYYY"
                        )}
                      </div>
                    </>
                  )}
                </td>
                <td data-label='Prioridad'>Prioridad</td>
                <td data-label='Acciones'>
                  <div
                    style={{
                      color: "var(--blue-6, #2393F4)",
                      fontSize: "0.8rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={() => { open();SetCoolerDrawer(cooler) }}
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
            ))}
          </tbody>
        </table>
      </section>
      {/* Seccion botones */}
      <section className="section_Vault_Buttons">
        <ButtonBack prevStep={prevStep} active={active} />
        <ButtonNext nextStep={nextStep} active={true} />
      </section>
      <DrawerVault opened={opened} onCLose={close} cooler={coolerDrawer} />
    </section>
  );
};
