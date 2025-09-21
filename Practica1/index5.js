const esPalindromo = (cadena) => {
    const cadenaLimpia = cadena.toLowerCase().replace(/\s/g, '');
    return cadenaLimpia === cadenaLimpia.split('').reverse().join('');
};
console.log(esPalindromo("oruro")); // true
console.log(esPalindromo("hola")); // false