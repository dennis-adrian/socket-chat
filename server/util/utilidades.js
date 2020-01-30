//creamos esta funcion porque la estaremos usando constantemente en el codigo
const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}

module.exports = {
    crearMensaje
}