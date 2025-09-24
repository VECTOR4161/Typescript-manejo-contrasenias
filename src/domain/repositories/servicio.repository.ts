import { ActualizarServicioDto, CrearServicioDto, Servicio } from "..";
import { PaginacionDto } from "../../common";

export abstract class ServicioRepository{
    abstract crearServicio(crearServicioDto: CrearServicioDto): Promise<Servicio>
    abstract actualizarServicio(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio>
    abstract eliminarServicio(idServicio: number): Promise<boolean>
    abstract obtenerServicio(idServicio: number): Promise<Servicio>
    abstract obtenerServicios(paginacionDto: PaginacionDto): Promise<Servicio[]>
}