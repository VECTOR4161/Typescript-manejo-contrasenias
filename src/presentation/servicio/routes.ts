import { Router } from "express"
import { ServicioDatasourcePrismaImpl, ServicioRepositoryImpl } from "../../infrastructure"
import { ServicioController } from "./controller"

export class ServicioRoutes{
    static get routes(): Router{

        const router = Router()

        const servicioDatasourceImpl = new ServicioDatasourcePrismaImpl()
        const servicioRepositoryImpl = new ServicioRepositoryImpl(servicioDatasourceImpl)
        const servicioController = new ServicioController(servicioRepositoryImpl)


        router.post('/create', servicioController.crearServicio)
        router.get('/index', servicioController.obtenerServicios)
        router.get('/edit/:id', servicioController.obtenerServicio)
        router.put('/update/:id', servicioController.actualizarServicio)
        router.delete('/delete/:id', servicioController.eliminarServicio)

        return router
    }
}