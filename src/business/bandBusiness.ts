import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { BandDatabase } from "../data/BandDatabase";
import { bandInputDTO } from "./entities/Band";

export class BandBusiness{
    
   constructor(
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private bandDatabase: BandDatabase,
 ) { }

    public async registerBand(input: bandInputDTO, token: string){

        const id = this.idGenerator.generate();

        const checkRole = this.authenticator.getData(token)
        
        if(input.name || input.musicGenre || input.responsible){
            throw new CustomError(417, "Invalid input to registerBand")
        }

       if(checkRole.role !== "ADMIN"){
           throw new CustomError(401, "Not authorized! You need to be an administrator")
        }

       await this.bandDatabase.createBand(
            id,
            input.name,
            input.musicGenre,
            input.responsible
        )
    }
    public async getBandDetailByNameOrId(input: string){
        if(!input){
            throw new CustomError(417, "Invalid input to getBandDetails")
        }
        const result = await this.bandDatabase.getBandDetailsByNameOrId(input)
       
        return result
    }
}