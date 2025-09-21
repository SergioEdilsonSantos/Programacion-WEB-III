const desestructurarResto = (arreglo) => {
    const [primero, segundo, ...resto] = arreglo;
    return resto;
};

console.log(desestructurarResto([1, 2, 3, 4, 5])); // [3, 4, 5]