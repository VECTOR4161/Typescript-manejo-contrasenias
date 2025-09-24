import { ServicioRepository } from "../.."


interface EliminarServicioUseCase{
    execute(idServicio: number): Promise<boolean>
}

export class EliminarServicio implements EliminarServicioUseCase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    execute(idServicio: number): Promise<boolean> {
        return this.servicioRepository.eliminarServicio(idServicio)
    }
}