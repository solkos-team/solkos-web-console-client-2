import { Drawer } from '@mantine/core'
import React from 'react'
import { LogOutLogin } from '../../sampleData/Login/LoginIcons'
import { useNavigate } from 'react-router-dom';
export const DrawerOrganizationResponsive = ({opened,onClose,dt,data,validaUser,setData,saveOrganization}) => {
  const navigate = useNavigate();
  return (
    <Drawer opened={opened}
    onClose={onClose} position='bottom' title={<div style={{color:'var(--Neutral-Outline, #868E96',fontSize:'0.75rem',fontStyle:'normal',fontWeight:'400',lineHeight:'24px'}}>Organización</div>} className='drawerMenuResponsive'    >
        <section style={{display:'flex',flexDirection:'column',height:'100%'}}>
          <section style={{width:'100%',height:'60%',overflow:'auto',scrollbarWidth:'thin',backgroundColor:''}}>            
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
          <hr style={{border:'1px solid #CACACA',width:'100%'}} />
          <section style={{width:'100%',height:'20%',paddingLeft:'1rem'}}>
            <div style={{fontSize:'0.75rem',color:'var(--Neutral-Outline, #868E96)',fontWeight:'400'}}>Sistema</div>
            <div style={{width:'100%',backgroundColor:'',display:'flex',flexDirection:'row',alignItems:'center',gap:'0.625rem'}} onClick={() => {
                          localStorage.clear();
                          sessionStorage.clear();
                          navigate("/");
                        }}>
              <img src={LogOutLogin} alt="" />
              <div style={{fontSize:'0.875rem',color:'var(--Semantic-Error-Error, #F93448)',fontWeight:'400'}}>Cerrar sesión</div>
            </div>
          </section>      
        </section>
    </Drawer>
  )
}
