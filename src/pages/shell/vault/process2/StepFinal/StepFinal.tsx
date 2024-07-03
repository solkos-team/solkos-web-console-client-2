import React from 'react'

export const StepFinal = ({ active }) => {
    return (
        <section style={{ width: '100%', height: '100%', display: active == 3 ? 'flex' : 'none', flexDirection: 'column' }}>
            <section className='section_Vault_Title'>
                <div className='vault_h1_title'>Valut</div>
                <div className='vault_h2_description'>Proceder con los cambios.</div>
            </section>
            <section style={{width:'100%',height:'90%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <section className="vault_container_final">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="#B2F2BB" />
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#40C057" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div className="vault_container_final_h1">
                        Proceso Completo
                    </div>
                </section>
            </section>
        </section>
    )
}
