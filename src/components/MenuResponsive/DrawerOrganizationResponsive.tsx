import { Drawer } from '@mantine/core'
import React from 'react'

export const DrawerOrganizationResponsive = ({opened,onClose,dt,data,validaUser,setData,saveOrganization}) => {

  return (
    <Drawer opened={opened}
    onClose={onClose} position='bottom' title={<div style={{color:'var(--Neutral-Outline, #868E96',fontSize:'0.75rem',fontStyle:'normal',fontWeight:'400',lineHeight:'24px'}}>Organización</div>} className='drawerMenuResponsive'    >
        <section style={{width:'100%',height:'80%',overflow:'auto',scrollbarWidth:'thin'}}>
        {data === undefined
                          ? "Sin registros"
                          : data.map((nombre, index) =>
                              JSON.parse(validaUser).length == 0 ? (
                                <div
                                  style={{
                                    // display: "flex",
                                    padding: "10px 12px",
                                    alignItems: "center",
                                    gap: "10px",
                                    alignSelf: "stretch",
                                    display:
                                      JSON.parse(validaUser).length === 0
                                        ? ""
                                        : "none",
                                  }}
                                  key={index}
                                  onChange={setData}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      flex: "100",
                                      fontSize: "12px",
                                      textDecorationColor:
                                        dt === nombre ? "#ec547c" : "",
                                      color:
                                        dt === nombre ? "#ec547c" : "black",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      saveOrganization(nombre);
                                      onClose()
                                    }}
                                  >
                                    {nombre}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    // display: "flex",
                                    padding: "10px 12px",
                                    alignItems: "center",
                                    gap: "10px",
                                    alignSelf: "stretch",
                                    display: dt === nombre ? "" : "none",
                                  }}
                                  key={index}
                                  onChange={setData}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      flex: "100",
                                      fontSize: "14px",
                                      textDecorationColor:
                                        dt === nombre ? "#ec547c" : "",
                                      color: dt === nombre ? "#ec547c" : "",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      saveOrganization(nombre);
                                      onClose()
                                    }}
                                  >
                                    {nombre}
                                  </div>
                                </div>
                              )
                            )}
        </section>        
    </Drawer>
  )
}
