// Promesas anidadas (antes)
const promesasAnidadas = () => {
    obtenerUsuario()
        .then(usuario => {
            return obtenerPosts(usuario.id)
                .then(posts => {
                    return obtenerComentarios(posts[0].id)
                        .then(comentarios => {
                            console.log(comentarios);
                        });
                });
        });
};

// Con async/await (después)
const conAsyncAwaitMejor = async () => {
    const usuario = await obtenerUsuario();
    const posts = await obtenerPosts(usuario.id);
    const comentarios = await obtenerComentarios(posts[0].id);
    console.log(comentarios);
};