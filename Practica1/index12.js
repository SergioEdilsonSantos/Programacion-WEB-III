// Callback hell (antes)
const callbackHell = (callback) => {
    setTimeout(() => {
        console.log("Paso 1");
        setTimeout(() => {
            console.log("Paso 2");
            setTimeout(() => {
                console.log("Paso 3");
                callback();
            }, 1000);
        }, 1000);
    }, 1000);
};

// Con async/await (después)
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const conAsyncAwait = async () => {
    await esperar(1000);
    console.log("Paso 1");
    await esperar(1000);
    console.log("Paso 2");
    await esperar(1000);
    console.log("Paso 3");
};