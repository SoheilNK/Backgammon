import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
// import { CreateAdminUser1685301038827 } from "../1685301038827-CreateAdminUser"


const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
    logging: false,
    // migrations: [CreateAdminUser1685301038827],
    subscribers: [],

})
