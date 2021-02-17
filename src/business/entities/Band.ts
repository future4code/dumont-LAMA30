export class Band {
    constructor(
       public readonly id: string,
       public readonly name: string,
       public readonly musicGenre: string,
       public readonly responsible: string,
    ) { }
}

export interface bandInputDTO {
    name: string,
    musicGenre: string,
    responsible: string
}
