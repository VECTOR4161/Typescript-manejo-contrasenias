export class PaginacionDto{
    constructor(
        public first: number,
        public rows: number
    ){}

    static create(object: {[key: string]: any}): [string | undefined, PaginacionDto | undefined]
    {
        let { first, rows } = object

        if( !first ) first = 0
        if( !rows ) rows = 10

        return [undefined, new PaginacionDto(
            first,
            rows
        )]
    }
}