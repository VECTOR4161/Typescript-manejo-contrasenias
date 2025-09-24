import { PaginacionDto } from "../../common";
import { ActualizarServicioDto, CrearServicioDto, Servicio, ServicioDatasource } from "../../domain";


export class ServicioDatasourcePrismaImpl implements ServicioDatasource{
    crearServicio(crearServicioDto: CrearServicioDto): Promise<Servicio> {
        throw new Error("Method not implemented.");
    }
    actualizarServicio(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio> {
        throw new Error("Method not implemented.");
    }
    eliminarServicio(idServicio: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    obtenerServicio(idServicio: number): Promise<Servicio> {
        throw new Error("Method not implemented.");
    }
    obtenerServicios(paginacionDto: PaginacionDto): Promise<Servicio[]> {
        throw new Error("Method not implemented.");
    }
}