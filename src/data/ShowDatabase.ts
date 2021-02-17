import { DAY, Show, showOutputDTO } from "../business/entities/Show";
import { CustomError } from "../business/error/CustomError";
import { BandDatabase } from "./BandDatabase";
import BaseDatabase from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase{
    
    private static TABLE_NAME = "LAMA_SHOWS"

    public async registerShowDB(
        show: Show 
    ):Promise<void>{
       try{
            await BaseDatabase.connection
            .insert({
                id: show.id,
                week_day: show.weekDay,
                start_time: show.startTime,
                end_time: show.endTime,
                band_id: show.bandId,
            })
            .into(ShowDatabase.TABLE_NAME);
       }
       catch(error){
           console.log("error => ", error)
            throw new CustomError(500, "An unexpected error ocurred");
       }
    }
    public async getShowsByTime(
        weekDay: DAY,
        startTime: number, 
        endTime: number
    ): Promise<showOutputDTO[]>{
        const shows = await BaseDatabase.connection
        .select("*")
        .where("end_time", ">",`${startTime}`)
        .andWhere("start_time", "<", `${endTime}`) // ouu .and.where()
        .from(ShowDatabase.TABLE_NAME)
        
        return shows.map((show: any) => {
            return{
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime,
                endTime: show.endTime,
                weekDay: show.weekDayk
            }
        })
    }
}
