const clasificarProductos = (productos) => {
    const productosUnicos = productos.reduce((acc, producto) => {
        const existente = acc.find(p => p.nombre === producto.nombre);
        if (!existente) {
            acc.push(producto);
        } else if (producto.precio > existente.precio) {
            const index = acc.indexOf(existente);
            acc[index] = producto;
        }
        return acc;
    }, []);
    const caros = productosUnicos.filter(p => p.precio > 50);
    const baratos = productosUnicos.filter(p => p.precio <= 50);
    return { caros, baratos };
};
let productos = [
    {nombre: 'cuaderno', precio: 30},
    {nombre: 'estuche', precio: 60},
    {nombre: 'cuaderno', precio: 40}
];
const {caros, baratos} = clasificarProductos(productos);
console.log("Caros:", caros);
console.log("Baratos:", baratos);