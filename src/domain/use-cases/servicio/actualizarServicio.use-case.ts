import { ActualizarServicioDto, Servicio, ServicioRepository } from "../..";

interface ActualizarServicioUsecase{
    execute(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio>
}

export class ActualizarServicio implements ActualizarServicioUsecase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}
    
    execute(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio> {
        return this.servicioRepository.actualizarServicio(idServicio, actualizarServicioDto)
    }
}