import React, { useEffect, useState } from 'react'
import { Drawer, Skeleton } from '@mantine/core'
import { CoolerInterface } from '../../../../interfaces/CoolerInterface';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';
import { ExportToExcel } from '../../../../components/exportExcel/ExportToExcel';
import { ArrowIcon } from './Icons';

export const DrawerNS = ({opened,close,values,setvalues}) => {  
  const [coolersData, setCoolersData] = useState<CoolerInterface[]>([]);
  const [datosPorPagina, setNumero] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const lastIndex = currentPage * Number(datosPorPagina);
  const firstIndex = lastIndex - Number(datosPorPagina);
  const {icon,title} =  values
  const navigate = useNavigate();
  useEffect(()=>{
    opened == false ? setvalues({}) : ''
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
             <div>{title}</div>
           </section>
           <section className="insights_drawer_header_max">
             <div>10</div>
             <div className="insights_drawer_header_arrow"><img src={ArrowIcon} alt="" /></div>
             <div>+0</div>
             <div>desde ayer</div>
           </section>
         </section>
         <section className="insights_drawer_content">
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
                 <ExportToExcel
                   datos={coolersData}
                   nombre={"Enfriadores_Puntos_de_Venta"}
                 />
               </div>
             </div>
           </div>
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
                       <td data-label="Serie" title={cooler.status}>
                         {isLoading == true ? (
                           <>
                             <Skeleton height={20} radius="sm" width="90%" />
                           </>
                         ) : cooler.status === "" ||
                           cooler.status === null ||
                           cooler.status === undefined ? (
                           "Sin registro"
                         ) : (
                           <div>                             
                               {cooler.status}                             
                           </div>
                         )}
                       </td>
                       <td data-label="Modelo" title={cooler.model_id}>
                       {isLoading == true ? (
                           <>
                             <Skeleton height={20} radius="sm" width="90%" />
                           </>
                         ) : cooler.status === "" ||
                           cooler.status === null ||
                           cooler.status === undefined ? (
                           "Sin registro"
                         ) : (
                           <div>                             
                               {cooler.status}                             
                           </div>
                         )}
                       </td>
                       <td data-label="Transmisión"
                         title={
                           cooler.days_without_visit === null ||
                             cooler.days_without_visit === undefined
                             ? "Sin registro"
                             : cooler.days_without_visit
                         }
                       >
                         {isLoading == true ? (
                           <>
                             <Skeleton height={20} radius="sm" width="90%" />
                           </>
                         ) : cooler.status === "" ||
                           cooler.status === null ||
                           cooler.status === undefined ? (
                           "Sin registro"
                         ) : (
                           <div>                             
                               {cooler.status}                             
                           </div>
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
       </section>
     </Drawer>
  )
}
