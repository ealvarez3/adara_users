import express, { Application } from "express";
import { IserverSettings, IServerSetup } from "./interfaces.server";
import morgan from "morgan";
import cors from "cors";
// Routers
import { userRouter } from "../routers/user.router";
import { authRouter } from "../routers/auth.router";
import adaraSequelize from "../database/main.database";
import { testAdaraDatabase } from "../database/main.database";


export default class AdaraServer implements IServerSetup
{
    public serverSettings: IserverSettings;

    constructor(serverSettings: IserverSettings)
    {
        this.serverSettings = serverSettings;
    }

    setupMiddlewares(application: Application): void
    {
        application.use((request, response, next) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        // Cors middleware
        application.use(cors({origin: "*"}));
        // Express middlewares
        application.use(express.json());
        application.use(express.urlencoded({extended: true}));
        // Morgan middleware
        application.use(morgan("dev"));
    }

    setupRoutes(application: Application): void
    {
        // Users router -> Create, update, delete, etc.
        application.use("/api/v1/users", userRouter);
        // Auth router -> Login, register, etc.
        application.use("/api/v1/auth", authRouter);
    }

    configureApplication(): Promise<Application> 
    {
        this.serverSettings.application.set("port", this.serverSettings.port);
        this.setupMiddlewares(this.serverSettings.application);
        this.setupRoutes(this.serverSettings.application);
        return Promise.resolve(this.serverSettings.application);
    }

    startServer(): void 
    {
        this.configureApplication()
        .then(application => {
           adaraSequelize.sync({force: false, alter: true})
           testAdaraDatabase()
            application.listen(this.serverSettings.port, ()=>{
                console.log(`Go to the moon! => Server listening on port ${this.serverSettings.port}`);
            });
        })
        .catch(error => {
            console.log(`Error on start server: ${error}`);
        })
        .finally(()=>{
            console.log("Finally - Server started!");
        });
    }
}