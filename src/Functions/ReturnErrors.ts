const loginErrors = (error: string) => {
    if (error.includes('404')) {
        return {title:'Error de sesión',message : 'Usuario o contraseña incorrectos. Inténtalo de nuevo.'}
    } else if (error === 'Fetch error: Failed to fetch') {
        return {title:'Error de Red',message : 'No fue posible iniciar sesión en Consola, debido a una falla de red. Verifica tu conexión a internet, si el problema persiste contacta al equipo de soporte.'}
    } else if (error.includes('504')) {
        return {title:'Error de Red',message : 'No pudimos establecer una conexión con el servidor a tiempo.'}
    } else {
        return {title:'Error',message : error};
    }
}



export { loginErrors }