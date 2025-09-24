import { CrearServicioDto, Servicio, ServicioRepository } from "../.."

interface CrearServicioUseCase{
    execute(crearServicioDto: CrearServicioDto): Promise<Servicio>
}

export class CrearServicio implements CrearServicioUseCase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    execute(crearServicioDto: CrearServicioDto): Promise<Servicio> {
        return this.servicioRepository.crearServicio(crearServicioDto)
    }
}