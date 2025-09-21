// Con promesas (antes)
const conPromesas = () => {
    return obtenerDatos()
        .then(datos => procesarDatos(datos))
        .then(resultado => mostrarResultado(resultado))
        .catch(error => console.error(error));
};

// Con async/await (después)
const conAsyncAwaitMigrado = async () => {
    try {
        const datos = await obtenerDatos();
        const resultado = await procesarDatos(datos);
        await mostrarResultado(resultado);
    } catch (error) {
        console.error(error);
    }
};