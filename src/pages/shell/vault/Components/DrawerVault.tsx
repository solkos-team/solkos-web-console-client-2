import { Drawer, Loader } from '@mantine/core'
import React from 'react'

export const DrawerVault = ({ opened, onCLose }) => {
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
                            <Loader color="blue" />
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="27"
                            viewBox="0 0 26 27"
                            fill="none"
                        >
                            <path
                                d="M13.0007 15.6666C14.7956 15.6666 16.2507 14.2115 16.2507 12.4166C16.2507 10.6217 14.7956 9.1666 13.0007 9.1666C11.2057 9.1666 9.75065 10.6217 9.75065 12.4166C9.75065 14.2115 11.2057 15.6666 13.0007 15.6666Z"
                                stroke="#313A49"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M19.1291 18.545L14.5325 23.1416C14.1262 23.5474 13.5755 23.7754 13.0012 23.7754C12.4269 23.7754 11.8762 23.5474 11.4699 23.1416L6.87224 18.545C5.66023 17.3329 4.83485 15.7887 4.50048 14.1075C4.16611 12.4264 4.33777 10.6838 4.99374 9.10022C5.64971 7.51662 6.76054 6.1631 8.18576 5.21081C9.61098 4.25852 11.2866 3.75024 13.0007 3.75024C14.7147 3.75024 16.3903 4.25852 17.8156 5.21081C19.2408 6.1631 20.3516 7.51662 21.0076 9.10022C21.6635 10.6838 21.8352 12.4264 21.5008 14.1075C21.1665 15.7887 20.3411 17.3329 19.1291 18.545Z"
                                stroke="#313A49"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <p>Ubicación en el mapa</p>
                    </div>
                    <div className="vault_drawer_mapa_mapa"></div>
                </section>
            </section>
        </Drawer>
    );
}
