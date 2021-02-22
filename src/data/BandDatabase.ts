import { Band } from "../business/entities/Band";
import { CustomError } from "../business/error/CustomError";
import BaseDatabase from "./BaseDatabase";

export class BandDatabase extends BaseDatabase{
    
    private static TABLE_NAME = "LAMA_BANDAS"

    private static toBandModel(band: any): Band{
        return new Band(
            band.id,
            band.name,
            band.music_genre,
            band.responsible
        );
    }
    public async createBand(
        id: string,
        name: string,
        musicGenre: string,
        responsible: string
    ):Promise<void>{
       try{
            await BaseDatabase.connection
            .insert({
                id: id,
                name: name,
                music_genre: musicGenre,
                responsible: responsible
            })
            .into(BandDatabase.TABLE_NAME);
       }
       catch(error){
            throw new CustomError(500, "An unexpected error ocurred");
       }
    }
    public async getBandDetailsByNameOrId(input: string): Promise<Band>{
        try{
            const band = await BaseDatabase.connection
                .select("*")
                .where({name: input})
                .orWhere({id: input})
                .from(BandDatabase.TABLE_NAME)

            if(!band[0]){
                throw new CustomError(404, `Unable to found Band with input : ${input}`)
            }
            return BandDatabase.toBandModel(band[0])
        }
        catch(error){
            throw error
        }
    }
}

