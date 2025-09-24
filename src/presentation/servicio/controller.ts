import { Request, Response } from "express"
import { CustomError, ServicioRepository } from "../../domain";

export class ServicioController{
    constructor(
        private readonly servicioRepository: ServicioRepository
    ){}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    }

    registrarServicio = (req: Request, res: Response) => {}
    obtenerServicios = (req: Request, res: Response) => {}
    obtenerServicio = (req: Request, res: Response) => {}
    actualizarServicio = (req: Request, res: Response) => {} 
    eliminarServicio = (req: Request, res: Response) => {} 
}