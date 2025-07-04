import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.createQueryBuilder("user").addSelect("user.password").where("user.username = :username", { username }).getOne();

    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    if (user.status === 'B') {
        return res.status(403).json({ message: 'Usuário bloqueado.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts >= 3) {
            user.status = 'B'; 
        }
        await userRepository.save(user);
        return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }

    user.failedLoginAttempts = 0;
    user.quantAcesso += 1; 
    await userRepository.save(user);

    const token = jwt.sign({ username: user.username, tipo: user.tipo }, 'seu_segredo_jwt', { expiresIn: '8h' });

    const { password: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword, token });
};