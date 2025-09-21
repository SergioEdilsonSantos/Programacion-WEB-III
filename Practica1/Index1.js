const contarVocales = (texto) => {
    const vocales = 'aeiou';
    const resultado = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    
    texto.toLowerCase().split('').forEach(letra => {
        if (vocales.includes(letra)) {
            resultado[letra]++;
        }
    });
    
    return resultado;
};

console.log(contarVocales("euforia")); // { a: 1, e: 1, i: 1, o: 1, u: 1 }