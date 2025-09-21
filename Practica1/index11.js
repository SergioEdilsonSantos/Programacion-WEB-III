const encadenarPromesas = () => {
    return Promise.resolve(5)
        .then(valor => valor * 2)
        .then(valor => valor + 10)
        .then(valor => valor / 2);
};

encadenarPromesas().then(resultado => console.log(resultado)); // 10