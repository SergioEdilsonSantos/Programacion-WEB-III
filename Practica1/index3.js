const separarParesImpares = (numeros) => {
    return {
        pares: numeros.filter(num => num % 2 === 0),
        impares: numeros.filter(num => num % 2 !== 0)
    };
};

console.log(separarParesImpares([1,2,3,4,5])); // { pares: [2,4], impares: [1,3,5]}