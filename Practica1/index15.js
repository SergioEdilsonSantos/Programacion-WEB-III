const callbackAPromesa = (funcionConCallback) => {
    return new Promise((resolve, reject) => {
        funcionConCallback((error, resultado) => {
            if (error) reject(error);
            else resolve(resultado);
        });
    });
};

// Uso
const funcionConCallback = (callback) => {
    setTimeout(() => callback(null, "datos"), 1000);
};

callbackAPromesa(funcionConCallback)
    .then(resultado => console.log(resultado))
    .catch(error => console.error(error));