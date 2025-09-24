import { Servicio, ServicioRepository } from "../.."
import { CryptoAdapter } from "../../../common";


interface ObtenerServicioUseCase{
    execute(idServicio: number): Promise<Servicio>
}

export class ObtenerServicio implements ObtenerServicioUseCase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    async execute(idServicio: number): Promise<Servicio> {
        let servicio = await this.servicioRepository.obtenerServicio(idServicio)
        const cifrador = new CryptoAdapter();
        servicio.contrasenia = await cifrador.decrypt(servicio.contrasenia)
        servicio.usuario = await cifrador.decrypt(servicio.usuario)
        servicio.servicio = await cifrador.decrypt(servicio.servicio)
        return servicio
    }
}