import { PrismaClient } from "@prisma/client";

export class PrismaAdapter{

    private static instance: PrismaClient

    static crearConexion(): PrismaClient{
        try {
            if(!PrismaAdapter.instance)
                this.instance = new PrismaClient()
            return this.instance
        } catch (error) {
            console.log(error)
            throw new Error()
        }
    }
}