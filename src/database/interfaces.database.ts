import { Sequelize } from "sequelize";

export interface IDatabaseSettings
{
    databaseUri: string;
    adaraSequelize: Sequelize;
}

export interface IDatabaseSetup
{
    databaseSettings: IDatabaseSettings;
    testDatabase(): Promise<void>;
}