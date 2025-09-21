const desestructurarPrimeros = (arreglo) => {
    const [primero, segundo] = arreglo;
    return { primero, segundo };
};

console.log(desestructurarPrimeros([1, 2, 3, 4])); // { primero: 1, segundo: 2 }