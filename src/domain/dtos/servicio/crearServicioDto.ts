export class CrearServicioDto{
    private constructor(
        public servicio: string,
        public usuario: string,
        public contrasenia: string
    ){}

    static create( object: {[key: string]: any}): [string?, CrearServicioDto?]{

        const { servicio, usuario, contrasenia } = object

        if( !servicio ) return ['El nombre del servicio es necesario', undefined];
        if( !usuario) return ['El nombre del servicio es necesario', undefined];
        if( !contrasenia ) return ['La contrasenia del servicio es necesario', undefined];


        return [undefined, new CrearServicioDto(
            servicio,
            usuario,
            contrasenia
        )];
    }
}