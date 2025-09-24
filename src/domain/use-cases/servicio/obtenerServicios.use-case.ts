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

        // Usamos Promise.all para resolver todas las promesas del map
        const serviciosDescifrados = await Promise.all(
            servicios.map(async (servicio) => ({
                id: servicio.id, // si quieres mantener el id u otras props
                contrasenia: await cifrador.decrypt(servicio.contrasenia),
                usuario: await cifrador.decrypt(servicio.usuario),
                servicio: await cifrador.decrypt(servicio.servicio),
                borrado: servicio.borrado, // ejemplo de conservar campos no cifrados
            }))
        )

        return serviciosDescifrados
    }
}