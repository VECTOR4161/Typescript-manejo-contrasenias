import { Servicio, ServicioRepository } from "../..";
import { PaginacionDto } from "../../../common";

interface ObtenerServiciosUsecase{
    execute(paginacionDto: PaginacionDto): Promise<Servicio[]>
}

export class ObtenerServicios implements ObtenerServiciosUsecase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    execute(paginacionDto: PaginacionDto): Promise<Servicio[]> {
        return this.servicioRepository.obtenerServicios(paginacionDto)
    }
}