class Usuarios {
    constructor() {
        this.personas = []
    }

    //permite agregar una persona al chat
    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala }

        //agregar la "persona" recibida al arreglo de personas
        this.personas.push(persona);

        return this.personas;
    }

    //buscar en el arreglo personas[] si alguien coincide con elid recibido
    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];
        //filter() retorna un nuevo arreglo y nosotros buscamos la posicion 0 de ese arreglo

        //si no se encuentra ninguna persona con el id, retorna undefined por defecto
        return persona;
    };

    //retorna todas las personas en el chat 
    getPersonas() {
        return this.personas;
    };

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala)

        return personasEnSala;
    };

    //eliminar una persona del arreglo de personas porque, por ejemplo, se desconecto del chat
    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        //si pasa el id que se encontro, y devuelve una cadena de personas con todas las personas que no tengan ese id
        this.personas = this.personas.filter(persona => {
            return persona.id != id
        })

        return personaBorrada;
    }
};

module.exports = {
    Usuarios
}