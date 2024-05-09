import React, { useEffect, useState } from 'react'
import { Drawer, Skeleton } from '@mantine/core'
import { CoolerInterface } from '../../../../interfaces/CoolerInterface';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';
import { ExportToExcel } from '../../../../components/exportExcel/ExportToExcel';
import { ALERTSIMBOLO, ArrowIcon,FAILSIMBOLO,TransmitiendoIcon } from './Icons';
import { fetchUniversalTables } from '../../../../utils/apiUtils';
import { pathVerify } from '../../../../Functions/pathVerify';
import { PaginationComponent } from '../../../../components/Pagination/PaginationComponent';

export const DrawerNS = ({opened,close,values,setvalues,selectedAlgorithm,level,dto}) => {  
  const [coolersData, setCoolersData] = useState<CoolerInterface[] | null>();
  const [datosPorPagina, setNumero] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState<String | number>(0);
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);  
  const {icon,title,algoritmo,total,type} =  values  
  const navigate = useNavigate();
  const body = {
    customer: dto,
    class: level === "INDICATOR" ? "ASSET_MANAGEMENT_ACTIONABLE" : "OPE",
    algorithm: [algoritmo],
    path: pathVerify(),
    page_size: Number(datosPorPagina),
    page_number: currentPage,
  };  
  const fetchData = async () => {
    try {
      const data = await fetchUniversalTables("coolers", body, setIsLoading);
      const datos = await data.json();
      const totalData = data.headers.get("pagination-count");
      setTotalData(Number(totalData) || 0);
      setCoolersData(datos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setCoolersData(undefined);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    opened == false ? setvalues({}) : ''    
    fetchData();
  },[opened])    
  const isloadingData = () => {
    let rows: any = [];
    for (let i = 0; i < 25; i++) {
      rows.push(
        <tr key={i}>
          <td data-label="Serie">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Modelo">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Transmisión">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
          <td data-label="Acciones">
            {
              <>
                <Skeleton height={20} radius="sm" width="90%" />
              </>
            }
          </td>
        </tr>
      );
    }
    return rows;
  };
   return (
     <Drawer opened={opened} onClose={close} title="" position='right' size="40rem">
       <section className="insights_drawer_container">
         <section className="insights_drawer_header">
           <section className="insights_drawer_header_iconHeader">
             <img src={icon} alt="IconDrawer" style={{ width: '2rem', height: '2rem' }} />
             <div>
              <div style={{                
                width:'100%' , 
                height:'40%',
                fontSize:'14px',
                borderRadius:'2px',                
                padding:'2px',
                boxSizing:'border-box',
                backgroundColor: type == 'ALERTA' ? 'var(--Semantic-Warning-Warning-Container, #FEF5C7)' : type == 'FALLA' ? 'var(--Semantic-Warning-Warning-Container, #FFC7CD)' : '',
                alignItems:'center',justifyContent:'center',gap:'5px',display: type == undefined ? 'none' : 'flex',
                color : 'var(--Semantic-Warning-On-Warning-Container, #451C03)'
                }}>
                <picture>
                  <img src={type == 'ALERTA' ? ALERTSIMBOLO : type == 'FALLA' ? FAILSIMBOLO : ''} alt="DrawerIcon" loading='lazy' style={{marginTop:'4px'}} />
                </picture>
                {type}
              </div>
                {title}
              </div>
           </section>
           <section className="insights_drawer_header_max">
             <div>{total}</div>
             <div className="insights_drawer_header_arrow"><img src={ArrowIcon} alt="" /></div>
             <div>+0</div>
             <div>desde ayer</div>
           </section>
         </section>
         <div
           style={{
             display: "flex",
             padding: "0px 64px",
             justifyContent: "space-between",
             alignItems: "center",
           }}
         >
           <div
             style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "flex-start",
             }}
           >
             <div
               style={{
                 color: "#88888B",
                 // fontFamily: "DM Sans",
                 fontSize: "10px",
                 fontStyle: "normal",
                 fontWeight: 500,
                 lineHeight: "155%",
               }}
             >
               TABLA
             </div>
             <div
               style={{
                 color: "#000005",
                 // fontFamily: "DM Sans",
                 fontSize: "12px",
                 fontStyle: "normal",
                 fontWeight: 300,
                 lineHeight: "155%",
               }}
             >
               ENFRIADORES
             </div>
           </div>
           <div
             style={{
               display: "flex",
               alignItems: "center",
               gap: "4px",
               marginLeft: 350,
             }}
           >
             <div style={{ marginLeft: "auto" }}>
               {/* <ExportToExcel
                   datos={coolersData}
                   nombre={"Enfriadores_Puntos_de_Venta"}
                 /> */}
             </div>
           </div>
         </div>
         <section className="insights_drawer_content">
           <section className="drawers_table">
             <table>
               <thead>
                 <tr>
                   <th scope="col">Serie</th>
                   <th scope="col">Modelo</th>
                   <th scope="col">Transmisión</th>
                   <th scope="col">Acciones</th>
                 </tr>
               </thead>
               {coolersData != undefined ? (
                 <tbody >
                   {coolersData
                     .slice(firstIndex, lastIndex)
                     .map((cooler, index) => (
                       <tr
                         key={index}
                         onClick={() => {
                           navigate(`/home/clt/${cooler.serial_number}`);
                         }}
                       >
                         <td data-label="Serie" title={cooler.serial_number}>
                           {isLoading == true ? (
                             <>
                               <Skeleton height={20} radius="sm" width="90%" />
                             </>
                           ) : cooler.serial_number === "" ||
                             cooler.serial_number === null ||
                             cooler.serial_number === undefined ? (
                             "Sin registro"
                           ) : (
                             <div>
                               {cooler.serial_number}
                             </div>
                           )}
                         </td>
                         <td data-label="Modelo" title={cooler.model_id}>
                           {isLoading == true ? (
                             <>
                               <Skeleton height={20} radius="sm" width="90%" />
                             </>
                           ) : cooler.model_id === "" ||
                             cooler.model_id === null ||
                             cooler.model_id === undefined ? (
                             "Sin registro"
                           ) : (
                             <div>
                               {cooler.model_id}
                             </div>
                           )}
                         </td>
                         <td data-label="Transmisión"
                           title={'Transmisión'}
                         >
                           {isLoading == true ? (
                             <>
                               <Skeleton height={20} radius="sm" width="90%" />
                             </>
                           ) : (
                             <picture>
                               <img src={TransmitiendoIcon} alt="Transmision" title='Transmisión' loading='lazy' />
                             </picture>
                           )}
                         </td>
                         <td data-label="Acciones">
                           {isLoading == true ? (
                             <>
                               <Skeleton height={20} radius="sm" width="90%" />
                             </>
                           ) : (
                             <Link to="/home/clt">
                               <div
                                 style={{
                                   color: "#3E83FF",
                                   fontSize: "0.8rem",
                                   fontStyle: "normal",
                                   fontWeight: 400,
                                   display: "flex",
                                   cursor: "pointer",
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
                             </Link>
                           )}
                         </td>
                       </tr>
                     ))}
                 </tbody>
               ) : isLoading == true ? (
                 <tbody>{isloadingData()}</tbody>
               ) : (
                 <div
                   style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     fontWeight: "bold",
                     fontSize: "18px",
                   }}
                 >
                   <p>Sin información para mostrar.</p>
                 </div>
               )}
             </table>
           </section>
           <section className="drawer_pagination">
             <PaginationComponent
               accion={setCurrentPage}
               totalDatos={totalData}
               datosPorPagina={datosPorPagina}
               numero={setNumero}
             />
           </section>
         </section>
       </section>
     </Drawer>
  )
}
