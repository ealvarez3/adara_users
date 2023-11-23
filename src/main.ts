import express, { Application } from "express";
import { IserverSettings } from "./server/interfaces.server";
import AdaraServer from "./server/main.server";
import { IDatabaseSettings } from "./database/interfaces.database";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";


const env: dotenv.DotenvConfigOutput = dotenv.config();

const port: number = Number(process.env.SYSTEM_PORT) || 3000;

const application: Application = express();

const serverSettings: IserverSettings = {
    port,
    application
};

const databaseSettings: IDatabaseSettings = {
    databaseUri: process.env.DATABASE_URI || "",
    adaraSequelize: new Sequelize(process.env.DATABASE_URI || "", {dialect: "postgres"})
};

const adaraServer: AdaraServer = new AdaraServer(serverSettings);

adaraServer.startServer();