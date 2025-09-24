import { CrearServicioDto, Servicio, ServicioRepository } from "../.."
import { CryptoAdapter } from "../../../common"

interface CrearServicioUseCase{
    execute(crearServicioDto: CrearServicioDto): Promise<Servicio>
}

export class CrearServicio implements CrearServicioUseCase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    async execute(crearServicioDto: CrearServicioDto): Promise<Servicio> {
        const cifrador = new CryptoAdapter();
        crearServicioDto.contrasenia = await cifrador.encrypt(crearServicioDto.contrasenia);
        crearServicioDto.servicio = await cifrador.encrypt(crearServicioDto.servicio);
        crearServicioDto.usuario = await cifrador.encrypt(crearServicioDto.usuario);
        return this.servicioRepository.crearServicio(crearServicioDto)
    }
}