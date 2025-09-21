const ejecutarCallback = (callback) => {
    setTimeout(callback, 2000);
};
ejecutarCallback(() => {
    console.log("Callback ejecutado después de 2 segundos");
});