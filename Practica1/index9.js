const promesaExito = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("¡Éxito después de 3 segundos!");
        }, 3000);
    });
};

promesaExito().then(mensaje => console.log(mensaje));