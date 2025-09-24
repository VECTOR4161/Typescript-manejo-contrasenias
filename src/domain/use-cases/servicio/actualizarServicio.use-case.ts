import { ActualizarServicioDto, Servicio, ServicioRepository } from "../..";
import { CryptoAdapter } from "../../../common";

interface ActualizarServicioUsecase{
    execute(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio>
}

export class ActualizarServicio implements ActualizarServicioUsecase{

    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}
    
    async execute(idServicio: number, actualizarServicioDto: ActualizarServicioDto): Promise<Servicio> {
        const cifrador = new CryptoAdapter();
        actualizarServicioDto.contrasenia =  (actualizarServicioDto.contrasenia) ? await cifrador.encrypt(actualizarServicioDto.contrasenia): actualizarServicioDto.contrasenia;
        actualizarServicioDto.servicio = (actualizarServicioDto.servicio) ? await cifrador.encrypt(actualizarServicioDto.servicio): actualizarServicioDto.servicio;
        actualizarServicioDto.usuario = (actualizarServicioDto.usuario) ? await cifrador.encrypt(actualizarServicioDto.usuario): actualizarServicioDto.usuario;
        return this.servicioRepository.actualizarServicio(idServicio, actualizarServicioDto)
    }
}