import React, { useEffect, useState } from "react";
import { TagInput } from "rsuite";
import { ButtonNext } from "../../Components/ButtonNext";
import { ButtonBack } from "../../Components/ButtonBack";
import { RoadMap } from "../../Components/RoadMap";
import { Switch } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DrawerVault } from "../../Components/DrawerVault";

export const StepOne = ({active,setActive,nextStep,prevStep}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [visibilityTable,setVisibilityTable] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([]);
  // if(visibilityTable == true){
  //   // @ts-ignore
  //   setActive(1)
  // }else{setActive(0)}  

  const handleTagChange = (newTags) => {        
    setTags(newTags);    
  };
    
  return (
    <section style={{width : '100%' ,height:'100%', display : active <= 1 ? 'flex' : 'none',flexDirection:'column',alignItems:'center'}}>
      {/* Seccion RoadMap */}
      <section
      className="vault_section_roadmap"
        style={{
          visibility: visibilityTable == false ? 'hidden' : 'visible',          
        }}
      >
        <RoadMap active={active} setActive={setActive} nextStep={nextStep} prevStep={prevStep} />
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
        }}
      >
        <img
          src={"../../sampleData/logovault.svg"}
          alt="Descripción de la imagen"
          style={{ width: "5rem", height: "3rem", marginTop: -20 }}
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
            onClick={()=>setVisibilityTable((o) => !o)}
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
        style={{
          width: "100%",
          height: "55%",          
          visibility : visibilityTable == false ? 'hidden' : 'visible'
        }}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Estatus</th>
              <th scope="col">Serie</th>
              <th scope="col">Modelo</th>
              <th scope="col">Última Visita</th>
              <th scope="col">Prioridad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label='Estatus'>
                <Switch
                  
                /></td>
              <td data-label='Serie'>Serie</td>
              <td data-label='Modelo'>Modelo</td>
              <td data-label='Última Visita'>Última Visita</td>
              <td data-label='Prioridad'>Prioridad</td>
              <td data-label='Acciones'>
                <div
                  style={{
                    color: "#3E83FF",
                    fontSize: "0.8rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    display: "flex",
                    cursor: "pointer",
                  }}
                  // onClick={()=>{open()}}
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
          </tbody>
        </table>
      </section>
      {/* Seccion botones */}
      <section className="section_Vault_Buttons">
        <ButtonBack  prevStep={prevStep} active={active} />
        <ButtonNext nextStep={nextStep} active={true}/>
      </section>
      <DrawerVault opened={opened} onCLose={close} />
    </section>
  );
};
