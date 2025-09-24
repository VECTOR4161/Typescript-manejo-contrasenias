import { PaginacionDto } from "../../common";
import { PrismaAdapter } from "../../data";
import { ActualizarServicioDto, CrearServicioDto, CustomError, Servicio, ServicioDatasource } from "../../domain";


export class ServicioDatasourcePrismaImpl implements ServicioDatasource{
    async crearServicio(crearServicioDto: CrearServicioDto): Promise<Servicio>{
        try {
            const prisma = PrismaAdapter.crearConexion()
            const servicio = await prisma.servicio.create({
                data: crearServicioDto
            })
            return servicio
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.internalServer('Error al insertar el registro')
        }
    }
    actualizarServicio(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio> {
        throw new Error("Method not implemented.");
    }
    async eliminarServicio(idServicio: number): Promise<boolean> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const servicio = await prisma.servicio.update({
                data: {borrado: true},
                where: {id: idServicio}
            })
            return true
        } catch (error) {
            return false
        }
    }
    obtenerServicio(idServicio: number): Promise<Servicio> {
        throw new Error("Method not implemented.");
    }
    async obtenerServicios(paginacionDto: PaginacionDto): Promise<Servicio[]> {
        const prisma = PrismaAdapter.crearConexion()
        return prisma.servicio.findMany({
            where: {borrado: false},
            skip: paginacionDto.first,
            take: paginacionDto.rows
        })
    }
   
}