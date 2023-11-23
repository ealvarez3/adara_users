import { IDatabaseSettings, IDatabaseSetup } from "./interfaces.database";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";


const env: dotenv.DotenvConfigOutput = dotenv.config();

const adaraSequelize: Sequelize = new Sequelize(process.env.DATABASE_URI || "", {
    dialect:"postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});

export function testAdaraDatabase(): Promise<void>
{
    return new Promise((resolve, reject) => {
        adaraSequelize.authenticate()
        .then(() => {
            console.log("Connection to database has been established successfully.");
            resolve();
        })
        .catch(error => {
            console.error("Unable to connect to the database:", error);
            reject(error);
        });
    });
}

export default adaraSequelize;