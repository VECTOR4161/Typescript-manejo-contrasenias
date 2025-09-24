export class ActualizarServicioDto{
    private constructor(
        public servicio?: string,
        public usuario?: string,
        public contrasenia?: string,
        public borrado?: boolean
    ){}

    static create( object: {[key: string]: any}): [string | undefined, ActualizarServicioDto | undefined]{

        const { servicio, usuario, contrasenia, borrado } = object

        return [undefined, new ActualizarServicioDto(
            servicio,
            usuario,
            contrasenia,
            borrado
        )];
    }
}