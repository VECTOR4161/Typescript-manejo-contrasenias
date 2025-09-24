import { Servicio, ServicioRepository } from "../..";
import { CryptoAdapter, PaginacionDto } from "../../../common";

interface ObtenerServiciosUsecase {
    execute(paginacionDto: PaginacionDto): Promise<Servicio[]>
}

export class ObtenerServicios implements ObtenerServiciosUsecase {

    constructor(
        private readonly servicioRepository: ServicioRepository
    ) { }

    async execute(paginacionDto: PaginacionDto): Promise<Servicio[]> {
        const servicios = await this.servicioRepository.obtenerServicios(paginacionDto)
        const cifrador = new CryptoAdapter()

        const serviciosDescifrados = await Promise.all(
            servicios.map(async (servicio) => ({
                id: servicio.id, 
                contrasenia: await cifrador.decrypt(servicio.contrasenia),
                usuario: await cifrador.decrypt(servicio.usuario),
                servicio: await cifrador.decrypt(servicio.servicio),
                borrado: servicio.borrado, 
            }))
        )

        return serviciosDescifrados
    }
}