export class ActualizarServicioDto{
    private constructor(
        public servicio?: string,
        public usuario?: string,
        public contrasenia?: string
    ){}

    static create( object: {[key: string]: any}): [string?, ActualizarServicioDto?]{

        const { servicio, usuario, contrasenia } = object

        return [undefined, new ActualizarServicioDto(
            servicio,
            usuario,
            contrasenia
        )];
    }
}