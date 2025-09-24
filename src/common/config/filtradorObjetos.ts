export class filtradorDeObjetos{
    static filtrarDto(object: { [key: string]: any }){
        return Object.fromEntries(Object.entries(object).filter(([_, v]) => v !== undefined))
    }
}