const loginErrors = (error: string): string => {
    if (error.includes('404')) {
        return 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
    } else if (error === 'Fetch error: Failed to fetch') {
        return 'Error de red. No fue posible establecer conexión con el servidor. Intenta de nuevo más tarde. Si el problema persiste, contacta con el equipo de soporte de consola.';
    } else if (error.includes('504')) {
        return 'No pudimos establecer una conexión con el servidor a tiempo.';
    } else {
        return error;
    }
}



export { loginErrors }