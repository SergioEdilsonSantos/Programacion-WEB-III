const promesaACallback = (promesa, callback) => {
    promesa
        .then(resultado => callback(null, resultado))
        .catch(error => callback(error, null));
};

// Uso
promesaACallback(Promise.resolve("éxito"), (error, resultado) => {
    if (error) console.error(error);
    else console.log(resultado);
});