const usarCallback = (dato, callback) => {
    setTimeout(() => callback(dato * 2), 1000);
};
const usarPromesa = (dato) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(dato * 2), 1000);
    });
};