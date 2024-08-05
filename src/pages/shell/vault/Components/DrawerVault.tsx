import { Drawer, Loader } from '@mantine/core'
import React from 'react'

export const DrawerVault = ({ opened, onCLose,cooler }) => {
    // console.log(cooler)
    return (
        <Drawer
            opened={opened}
            onClose={onCLose}
            title=""
            position="right"
            size="40rem"
        >
            <section className="vault_drawer_container">
                <section className="vault_drawer_header">
                    <section className="headerPrincipal">
                        <section className="headerContentIMG">
                            <section className="headerIMG">
                                {/* {
                        load == true
                            ?
                            <Loader color="gray" size="xs" />
                            :
                            <img
                                // src={data?.Asset?.Url ?? ''}
                                alt="cooler"
                                width={"100%"}
                                height={"100%"}
                                loading='lazy'
                                className="headerIMG__image"
                                // onError={({ currentTarget }) => {
                                //     currentTarget.onerror = null;
                                //     currentTarget.src =ImgDefault}}
                            />
                    } */}
                                <img
                                    // src={data?.Asset?.Url ?? ''}
                                    src="https://storage.googleapis.com/negocon-renders/default/default_cooler.webp"
                                    alt="cooler"
                                    width={"100%"}
                                    height={"100%"}
                                    loading='lazy'
                                    className="headerIMG__image"
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src =
                                            "https://storage.googleapis.com/negocon-renders/default/default_cooler.webp";
                                    }}
                                />
                            </section>
                            <section className="headerDataIMG">
                                <div className="headerDataIMGh1">
                                    <div className="headerDataIMGh1p1">
                                        {/* {
                                load == true
                                    ?
                                    <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                                    :
                                    // SerialNumber
                                    data?.Cooler?.SerialNumber == undefined ? 'Sin registro' : data?.Cooler?.SerialNumber
                            } */}
                                        Sin registro
                                    </div>
                                    {/* {
                            load == true
                                ?
                                <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                                :
                                <>
                                    <div className="headerDataIMGh1p2" 
                                    style={{
                                        width : 'max-content',
                                        display : data?.Cooler?.Actionable ?? 'none',
                                        color:
                                            data?.Cooler?.Actionable === "Visita PdV"
                                                ? "#DA7E05"
                                                : data?.Cooler?.Actionable ===
                                                    "Sin Riesgo"
                                                    ? "#0F9F67"
                                                    : data?.Cooler?.Actionable ===
                                                        "Estatus sin venta" ||
                                                        data?.Cooler?.Actionable ===
                                                        "Acciones urgentes"
                                                        ? "#F93448"
                                                        : data?.Cooler?.Actionable ===
                                                            "Actualizar Info"
                                                            ? "#DA7E05"
                                                            : "black",
                                        border: `1px solid`,
                                        borderColor: data?.Cooler?.Actionable === "Visita PdV"
                                            ? "#DA7E05"
                                            : data?.Cooler?.Actionable ===
                                                "Sin Riesgo"
                                                ? "#0F9F67"
                                                : data?.Cooler?.Actionable ===
                                                    "Estatus sin venta" ||
                                                    data?.Cooler?.Actionable ===
                                                    "Acciones urgentes"
                                                    ? "#F93448"
                                                    : data?.Cooler?.Actionable ===
                                                        "Actualizar Info"
                                                        ? "#DA7E05"
                                                        : "black"
                                    }}>
                                        <img src={data?.Cooler.Actionable === "Sin Riesgo" ? (SinRiesgo) : data?.Cooler.Actionable === "Visita PdV" ? (VisitaPdV) : data?.Cooler.Actionable === "Estatus sin venta" || data?.Cooler.Actionable === "Acciones urgentes" ? (SnVentaAccUrg) : data?.Cooler.Actionable === "Actualizar Info" ? (ActualizarInfo) : ('') } alt='AlertLogo' style={{ width: "0.563rem", height: '0.563rem', marginTop: '0.15rem' }} />
                                        {data?.Cooler?.Actionable == undefined ? 'Sin registro' : data?.Cooler?.Actionable}
                                    </div>
                                </>
                        } */}


                                </div>
                                <div className="headerDataIMGh2">
                                    {/* {
                            load == true
                                ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                                // : ModelID
                                : data?.Cooler?.ModelID == undefined ? 'Sin registro' : data?.Cooler?.ModelID
                        } */}
                                    Sin registro
                                </div>
                                <div className="headerDataIMGh2">
                                    <div className="headerDataIMGh3"
                                        style={{
                                            background: ''
                                            // data?.Cooler?.Status === "EN FALLA"
                                            // ? "#FFC7CD"
                                            // : data?.Cooler?.Status ===
                                            //   "FUNCIONANDO CORRECTAMENTE"
                                            // ? "#DFF9E3"
                                            // : data?.Cooler?.Status ===
                                            //   "FUNCIONANDO CON ALERTA"
                                            // ? "#FEF5C7"
                                            // : "#D4DAE3",
                                            //   color:
                                            //   data?.Cooler?.Status === "EN FALLA"
                                            //     ? "#F93448"
                                            //     : data?.Cooler?.Status ===
                                            //       "FUNCIONANDO CORRECTAMENTE"
                                            //     ? "#1D5E29"
                                            //     : data?.Cooler?.Status ===
                                            //       "FUNCIONANDO CON ALERTA"
                                            //     ? "#451C03"
                                            //     : "black",
                                        }}>
                                        {/* {
                                load == true
                                    ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                                    :
                                    <>
                                        <img src={RedPoint} alt="en falla" style={{ width: '0.25rem', height: '0.25rem', marginLeft: '0.25rem' }} />
                                        { data?.Cooler?.Status == undefined ? 'Sin registro' : data?.Cooler?.Status }
                                    </>
                            } */}
                                        Sin registro
                                    </div>
                                </div>
                                <div className="headerDataIMGh2" style={{ display: 'flex', flexDirection: 'row', gap: '0.3rem' }}>
                                    Leído por última vez el:
                                    {/* {
                            load == true
                                ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                                :
                                <div className="" style={{color:'#000005'}}>
                                   
                                    {  data?.Cooler?.LastRead == undefined ? 'Sin registro' : `${fechaFormateada.getDate().toString().padStart(2, '0')}/${(fechaFormateada.getMonth() + 1).toString().padStart(2, '0')}/${fechaFormateada.getFullYear()} ${fechaFormateada.getHours().toString().padStart(2, '0')}:${fechaFormateada.getMinutes().toString().padStart(2, '0')}`  }
                                </div>
                        } */}
                                    <div className="" style={{ color: '#000005' }}>

                                        Sin registro
                                    </div>
                                </div>
                                {/* {
                        load == true
                            ? <Skeleton radius="xl" style={{ width: '4rem', height: '10px' }} />
                            :
                            <div className="headerDataIMGh4">
                                
                                { data?.Cooler?.DaysWithoutVisit == undefined  ? 'Sin registro' :  `${data?.Cooler?.DaysWithoutVisit} días sin visita`}                                
                            </div>
                    } */}
                            </section>
                        </section>
                        <section className="headerContentData">
                            <section className="headerContentDataContainer">
                                <div className="headerContentData1">CANAL: </div>
                                {/* {
                        load == true
                            ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                            :
                            <div className="headerContentData2">
                                { data?.Cooler?.Channel == undefined || data?.Cooler?.Channel == '' ?  'Sin registro' : data.Cooler.Channel }
                            </div>
                    } */}
                                <div className="headerContentData2">
                                    Sin registro
                                </div>
                            </section>
                            <section className="headerContentDataContainer">
                                <div className="headerContentData1">REGIÓN: </div>
                                {/* {
                        load == true
                            ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                            :
                            <div className="headerContentData2">
                                { data?.Cooler?.Region == undefined || data?.Cooler?.Region == '' ?  'Sin registro' : data.Cooler.Region }
                            </div>
                    } */}
                                <div className="headerContentData2">
                                    Sin registro
                                </div>
                            </section>
                            <section className="headerContentDataContainer">
                                <div className="headerContentData1">RUTA: </div>
                                {/* {
                        load == true
                            ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                            :
                            <div className="headerContentData2">
                                { data?.Cooler?.Route == undefined || data?.Cooler?.Route == '' ? 'Sin registro' : data?.Cooler?.Route }
                            </div>
                    } */}
                                <div className="headerContentData2">
                                    Sin registro
                                </div>
                            </section>
                            <section className="headerContentDataContainer">
                                <div className="headerContentData1">GERENCIA DE ZONA: </div>
                                {/* {
                        load == true
                            ? <Skeleton radius="xl" style={{ width: '4rem', height: '50%' }} />
                            :
                            <div className="headerContentData2">
                                { data?.Cooler?.Zone == undefined || data?.Cooler?.Zone == '' ? 'Sin registro' : data?.Cooler?.Zone }
                            </div>
                    } */}
                                <div className="headerContentData2">
                                    Sin registro
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
                <section className="vault_drawer_registro">
                    <div className="vault_drawer_mapa_title">
                        <p>Registro</p>
                    </div>
                    <div className="vault_drawer_registro_stepper"></div>
                </section>
                <section className="vault_drawer_mapa">
                    <div className="vault_drawer_mapa_title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path d="M3.25 22.75H22.75M3.25 7.58333V8.66667C3.25 9.52862 3.59241 10.3553 4.2019 10.9648C4.8114 11.5743 5.63805 11.9167 6.5 11.9167C7.36195 11.9167 8.1886 11.5743 8.7981 10.9648C9.40759 10.3553 9.75 9.52862 9.75 8.66667M3.25 7.58333H22.75M3.25 7.58333L5.41667 3.25H20.5833L22.75 7.58333M9.75 8.66667V7.58333M9.75 8.66667C9.75 9.52862 10.0924 10.3553 10.7019 10.9648C11.3114 11.5743 12.138 11.9167 13 11.9167C13.862 11.9167 14.6886 11.5743 15.2981 10.9648C15.9076 10.3553 16.25 9.52862 16.25 8.66667M16.25 8.66667V7.58333M16.25 8.66667C16.25 9.52862 16.5924 10.3553 17.2019 10.9648C17.8114 11.5743 18.638 11.9167 19.5 11.9167C20.362 11.9167 21.1886 11.5743 21.7981 10.9648C22.4076 10.3553 22.75 9.52862 22.75 8.66667V7.58333M5.41667 22.75V11.7541M20.5833 22.75V11.7541M9.75 22.75V18.4167C9.75 17.842 9.97827 17.2909 10.3846 16.8846C10.7909 16.4783 11.342 16.25 11.9167 16.25H14.0833C14.658 16.25 15.2091 16.4783 15.6154 16.8846C16.0217 17.2909 16.25 17.842 16.25 18.4167V22.75" stroke="#313A49" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className='vault_drawer_mapa_title_p'>Acerca del punto de venta</div>
                    </div>
                    <div className="vault_drawer_mapa_info">
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <div className='vault_drawer_mapa_info_p'>Nombre del PdV</div>
                            <div className='vault_drawer_mapa_info_p2'>Pizza Planeta / 120151181</div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <div className='vault_drawer_mapa_info_p'>Dirección</div>
                            <div className='vault_drawer_mapa_info_p2'>Av Mexico 11 Santa Maria Aztahuacan iztapalapa</div>
                        </div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <div className='vault_drawer_mapa_info_p'>Distancia al punto de instalación</div>
                            <div className='vault_drawer_mapa_info_p2'>50m</div>
                        </div>
                    </div>
                    <div className="vault_drawer_mapa_mapa"></div>
                </section>
            </section>
        </Drawer>
    );
}
