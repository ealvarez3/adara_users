import { Application } from "express";

export interface IserverSettings
{
    port: number;
    application: Application;
    jwtSecret?: string;
}

export interface IServerSetup
{
    serverSettings: IserverSettings;
    setupMiddlewares(application: Application): void;
    setupRoutes(application: Application): void;
    configureApplication(): Promise<Application>;
    startServer(): void;
}