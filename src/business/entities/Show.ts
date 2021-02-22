import { CustomError } from "../error/CustomError";

export class Show {
    
    static getShow(): Show {
        throw new Error("Method not implemented.");
    }
    static showInputDTO(showInputDTO: any) {
        throw new Error("Method not implemented.");
    }
    constructor(
       public readonly id: string,
       public readonly weekDay: DAY,
       public readonly startTime: number,
       public readonly endTime: number,
       public readonly bandId: string
    ) { }


    public static toShow(data? : any){

        return ( data && new Show(
            data.id,
            data.weekDay || data.week_day,
            data.startTime || data.start_time,
            data.endTime || data.end_time,
            data.bandId || data.band_id
        ))
    }
}

export enum DAY {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    MONDAY = "MONDAY"
}

export interface showInputDTO {
    weekDay: DAY,
    startTime: number,
    endTime: number,
    bandId: string
}

export interface showOutputDTO{
    id: string,
    bandId: string,
    weekDay: DAY,
    startTime: number,
    endTime: number
}

export interface showByDayOutputDTO{
    name: string,
    musicGenre: string
}
