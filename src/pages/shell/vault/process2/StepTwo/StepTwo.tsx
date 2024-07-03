import React from 'react'
import { ButtonBack } from '../../Components/ButtonBack'
import { ButtonNext } from '../../Components/ButtonNext'
import { RoadMap } from '../../Components/RoadMap'

export const StepTwo = ({ active, setActive, nextStep, prevStep }) => {
    return (
        <section style={{ width: '100%', height: '100%', display: active == 2 ? 'flex' : 'none', flexDirection: 'column' }}>
            {/* Section Title & Info */}
            <section className='section_Vault_Title'>
                <div className='vault_h1_title'>Valut</div>
                <div className='vault_h2_description'>Proceder con los cambios.</div>
            </section>
            {/* Section Roadmap */}
            <section style={{ width: '100%', height: '10%' }} className="vault_section_roadmap">
                <RoadMap active={active} setActive={setActive} nextStep={nextStep} prevStep={prevStep} />
            </section>
            {/* Section Information */}
            <section className='section_Valult_Information'>
                <section className="vault_Information_Container">
                    <section className="vault_Information_Data">
                        <div className='vault_Information_Data_Title'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <circle cx="4.5" cy="4.5" r="4" fill="#3E83FF" />
                            </svg>                            
                            Entradas de archivo
                        </div>
                        <div className='vault_Information_Data_Title_container'>
                            <div className='vault_Information_Data_Title2'>Enfriadores</div>
                            <div className='vault_Information_Data_Title3'>100</div>
                        </div>
                    </section>
                    <section className="vault_Information_Data">
                        <div className='vault_Information_Data_Title'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <circle cx="4.5" cy="4.5" r="4" fill="#31B648" />
                            </svg>                            
                            Entradas validas
                        </div>
                        <div className='vault_Information_Data_Title_container'>
                            <div className='vault_Information_Data_Title2'>Enfriadores</div>
                            <div className='vault_Information_Data_Title3'>98</div>
                        </div>
                    </section>
                    <section className="vault_Information_Data">
                        <div className='vault_Information_Data_Title'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <circle cx="4.5" cy="4.5" r="4" fill="#F93448" />
                            </svg>                            
                            Enfriadores a activar valut
                        </div>
                        <div className='vault_Information_Data_Title_container'>
                            <div className='vault_Information_Data_Title2'>Enfriadores</div>
                            <div className='vault_Information_Data_Title3'>70</div>
                        </div>
                    </section>
                    <section className="vault_Information_Data">
                        <div className='vault_Information_Data_Title'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <circle cx="4.5" cy="4.5" r="4" fill="#F6A60A" />
                            </svg>                            
                            Enfriadores a desactivar valut
                        </div>
                        <div className='vault_Information_Data_Title_container'>
                            <div className='vault_Information_Data_Title2'>Enfriadores</div>
                            <div className='vault_Information_Data_Title3'>0</div>
                        </div>
                    </section>
                    <section className="vault_Information_Data">
                        <div className='vault_Information_Data_Title'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                <path d="M10 6.33333V9.5M10 12.6667H10.0079M17.125 9.5C17.125 13.435 13.935 16.625 10 16.625C6.06497 16.625 2.875 13.435 2.875 9.5C2.875 5.56497 6.06497 2.375 10 2.375C13.935 2.375 17.125 5.56497 17.125 9.5Z" stroke="#868E96" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Para proceder con los cambios escribir la contraseña
                        </div>
                        <div className='vault_Information_Data_Title_container_password'>
                            °°°Contraseña
                        </div>
                    </section>
                </section>
            </section>
            {/* Section Buttons */}
            <section className="section_Vault_Buttons">
                <ButtonBack prevStep={prevStep} active={active} />
                <ButtonNext nextStep={nextStep} />
            </section>
        </section>
    )
}
