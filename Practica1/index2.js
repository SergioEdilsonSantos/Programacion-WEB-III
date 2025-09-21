const invertirPalabras = (frase) => {
    return frase.split('').reverse().join('');
};

console.log(invertirPalabras("abcd")); // "dcba"