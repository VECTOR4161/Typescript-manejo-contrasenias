import { filtradorDeObjetos, PaginacionDto } from "../../common";
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
    async actualizarServicio(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const servicio = await prisma.servicio.update({
                data: filtradorDeObjetos.filtrarDto(actualizarServicioDto),
                where: {id: idServicio}
            })
            return servicio
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.internalServer('Error al actualizar el servicio')
        }
    }

    async eliminarServicio(idServicio: number): Promise<boolean> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            await prisma.servicio.update({
                data: {borrado: true},
                where: {id: idServicio}
            })
            return true
        } catch (error) {
            return false
        }
    }


    async obtenerServicio(idServicio: number): Promise<Servicio> {
        try {
            const prisma = PrismaAdapter.crearConexion()
            const servicio = await prisma.servicio.findFirst({
                where: {id: idServicio}
            })
            if(!servicio) throw CustomError.internalServer('Error al obtener el servicio')
            return servicio
        } catch (error) {
            if( error instanceof CustomError) throw CustomError.customizableError(error.statusCode, error.message)
            throw CustomError.internalServer('Error al obtener el servicio')
        }
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