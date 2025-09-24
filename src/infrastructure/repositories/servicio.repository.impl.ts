import { PaginacionDto } from "../../common";
import { ActualizarServicioDto, CrearServicioDto, Servicio, ServicioDatasource, ServicioRepository } from "../../domain";

export class ServicioRepositoryImpl implements ServicioRepository{

    constructor(
        private readonly servicioDatasource: ServicioDatasource
    ){}

    crearServicio(crearServicioDto: CrearServicioDto): Promise<Servicio> {
        return this.servicioDatasource.crearServicio(crearServicioDto)
    }
    actualizarServicio(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio> {
        return this.servicioDatasource.actualizarServicio(idServicio ,actualizarServicioDto)
    }
    eliminarServicio(idServicio: number): Promise<boolean> {
        return this.servicioDatasource.eliminarServicio(idServicio)
    }
    obtenerServicio(idServicio: number): Promise<Servicio> {
        return this.servicioDatasource.obtenerServicio(idServicio)
    }
    obtenerServicios(paginacionDto: PaginacionDto): Promise<Servicio[]> {
        return this.servicioDatasource.obtenerServicios(paginacionDto)
    }

}