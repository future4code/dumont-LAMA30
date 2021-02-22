import BaseDataBase from "./src/data/BaseDatabase";

export class MySqlSetup extends BaseDataBase{
    public async createTable(): Promise<void>{
        try{
           await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS LAMA_BANDAS 
            (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                music_genre VARCHAR(255) NOT NULL,
                responsible VARCHAR(255) UNIQUE NOT NULL
            )`)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS LAMA_SHOWS 
            (
                id VARCHAR(255) PRIMARY KEY,
                week_day VARCHAR(255) NOT NULL,
                start_time INT NOT NULL,
                end_time INT NOT NULL,
                band_id VARCHAR(255) NOT NULL,
                FOREIGN KEY(band_id) REFERENCES LAMA_BANDAS(id)
            )`)

            await BaseDataBase.connection.raw(`
            CREATE TABLE IF NOT EXISTS LAMA_USUÁRIOS 
            (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
            )`)

            console.log("Setup completed!")
        }
        catch(e){
            throw new Error(e.sqlMessage || e.message)
        }
        
    }
}
new MySqlSetup().createTable()
