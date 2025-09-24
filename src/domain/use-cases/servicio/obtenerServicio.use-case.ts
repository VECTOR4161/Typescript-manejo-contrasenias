import { Servicio, ServicioRepository } from "../.."


interface ObtenerServicioUseCase{
    execute(idServicio: number): Promise<Servicio>
}

export class ObtenerServicio implements ObtenerServicioUseCase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    execute(idServicio: number): Promise<Servicio> {
        return this.servicioRepository.obtenerServicio(idServicio)
    }
}