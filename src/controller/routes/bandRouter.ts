import express from "express";
import { BandController } from "../BandController";

export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/create", bandController.createBand);
bandRouter.get("/get-detail", bandController.getBandByNameOrId);

