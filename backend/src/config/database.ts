import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../entities/User";
import { Task } from "../entities/Task";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "fatec",
    database: "crud_ts_db",
    synchronize: false,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
});