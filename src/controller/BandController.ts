import { Request, Response } from "express";
import { BandBusiness } from "../business/bandBusiness";
import { bandInputDTO } from "../business/entities/Band";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";
import BaseDataBase from "../data/BaseDatabase";

const bandBusiness = new BandBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new BandDatabase()
);

export class BandController{
    async createBand(req: Request, res: Response){
        try{
            const token = req.headers.authorization as string;

            const band: bandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible
            }
            await bandBusiness.registerBand(band, token)
           
            res
            .status(200)
            .send("Band created successfully!");
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
    async getBandByNameOrId(req: Request, res: Response){
        try{
            const input = (req.query.id ?? req.query.name) as string
            
            const band = await bandBusiness.getBandDetailByNameOrId(input)

           res
           .status(200)
           .send({band})
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({ error: e.message });
        }
    }
}