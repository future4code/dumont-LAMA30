import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { ShowDatabase } from "../data/ShowDatabase";
import { DAY, Show, showInputDTO } from "./entities/Show";
import { BandDatabase } from "../data/BandDatabase";

export class ShowBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private showDatabase: ShowDatabase,
      private bandDatabase: BandDatabase
   ) { }

   public async createShow(input: showInputDTO, token: string){
        
        const id = this.idGenerator.generate()
        const data = this.authenticator.getData(token)

        if(data.role !== "ADMIN"){
            throw new CustomError(401, "Not authorized! You need to be an administrator")
        }
       
        if(input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime){
            throw new CustomError(417, "Invalid time to createShow")
        }
        if(!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)){
            throw new CustomError(417, "Times should be integer to createShow")
        }

        const band = await this.bandDatabase.getBandDetailsByNameOrId(input.bandId)

        if(!band){
            throw new CustomError(404, "Band not found")
        }

        const registeredShow = await this.showDatabase.getShowsByTimeAndDay(input.weekDay, input.startTime, input.endTime)

        if (registeredShow.length){
            throw new CustomError(404, "No more shows can be created as this time")
        }

        await this.showDatabase.registerShowDB(Show.
            toShow({
               id,
               ...input
            })
        )
    }
    public async getShowsByDay(weekDay: string){
        
        if(!weekDay){
            throw new CustomError(417, "Invalid input to getShowsByDay")
        }
        return await this.showDatabase.getShowByDay(weekDay)
    }
}
