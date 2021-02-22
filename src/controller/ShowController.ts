import { Request, Response } from "express";
import { DAY, showInputDTO } from "../business/entities/Show";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { ShowBusiness } from "../business/ShowBusiness";
import { BandDatabase } from "../data/BandDatabase";
import BaseDataBase from "../data/BaseDatabase";
import { ShowDatabase } from "../data/ShowDatabase";

const showBusiness = new ShowBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new ShowDatabase(),
   new BandDatabase()
);

export class ShowController{
    async createShow(req: Request, res: Response){
        try{
            const token = req.headers.authorization as string;

            const input: showInputDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId
            }

            await showBusiness.createShow(input, token)

            res
            .status(200)
            .send("Show created successfully!")
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({error: e.message});
        }  
    }
    async getShowByDay(req: Request, res: Response){
        try{
            req.headers.authorization as string;

            const weekDay = await showBusiness.getShowsByDay(req.query.weekDay as string)

            res.status(200).send(weekDay)
        }
        catch(e){
            res
            .status(e.statusCode || 400)
            .send({error: e.message});
        }
    }
}