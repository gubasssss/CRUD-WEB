import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';


declare global {
  namespace Express {   
    interface User {
      tipo: string;
      [key: string]: any;
    }
    interface Request {
      user?: User;
    }
  }
}

export const createUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado.' });
    }

    if (req.user.tipo !== '0') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem criar usuários.' });
    }
    
    const { username, password, nome, tipo } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOneBy({ username });
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = userRepository.create({ username, password: hashedPassword, nome, tipo });
    await userRepository.save(user);

    const { password: _, ...newUser } = user;
    return res.status(201).json(newUser);
};



export const updateCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Não autorizado.' });
        }

        const { nome, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ username: req.user.username });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (nome) {
            user.nome = nome;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 8);
        }

        await userRepository.save(user);

        const { password: _, ...updatedUser } = user;
        return res.json(updatedUser);

    } catch (error) {
        next(error);
    }
};



export const recoverPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.body;


        console.log(`[SIMULAÇÃO] Se o usuário '${username}' existir, um email de recuperação de senha seria enviado.`);

        return res.status(200).json({ 
            message: 'Se um usuário com este nome existir, instruções para recuperação de senha foram enviadas.' 
        });

    } catch (error) {
        next(error);
    }
};


export const verifyUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ username });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json({ message: 'Usuário verificado com sucesso.' });

    } catch (error) {
        next(error);
    }
};

