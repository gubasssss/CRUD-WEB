import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

AppDataSource.initialize()
    .then(() => { console.log("Fonte de dados inicializada!") })
    .catch((err) => { console.error("Erro durante a inicialização da fonte de dados", err) });

const app = express();

app.use(cors());
app.use(express.json());

// Definindo as rotas
app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);

export default app;