import { Request, Response } from "express"
import { PaginacionDto } from "../../common";
import { 
    ActualizarServicio, 
    ActualizarServicioDto, 
    CrearServicio, 
    CrearServicioDto, 
    CustomError, 
    EliminarServicio, 
    ObtenerServicio, 
    ObtenerServicios, 
    ServicioRepository 
} from "../../domain";

export class ServicioController{
    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    }

    crearServicio = (req: Request, res: Response) => {

        const [error, crearServicioDto] = CrearServicioDto.create(req.body)
        if( error ) { return res.status(502).json({ error }) }

        new CrearServicio(this.servicioRepository)
            .execute(crearServicioDto!)
            .then( data => res.json( data ))
            .catch( error => this.handleError(error, res))

    }

    obtenerServicios = (req: Request, res: Response) => {

        const [, paginacionDto] = PaginacionDto.create(req.body)

        new ObtenerServicios(this.servicioRepository)
            .execute(paginacionDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))

    }

    obtenerServicio = (req: Request, res: Response) => {

        new ObtenerServicio(this.servicioRepository)
            .execute(Number(req.params.id))
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))

    }

    actualizarServicio = (req: Request, res: Response) => {

        const [error, actualizarServicioDto] = ActualizarServicioDto.create(req.body)
        if( error ) { return res.status(502).json({ error }) }

        new ActualizarServicio(this.servicioRepository)
            .execute(Number(req.params.id), actualizarServicioDto!)
            .catch(error => this.handleError(error, res))

    } 
    eliminarServicio = (req: Request, res: Response) => {

        new EliminarServicio(this.servicioRepository)
            .execute(Number(req.params.id))
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res))

    } 
}