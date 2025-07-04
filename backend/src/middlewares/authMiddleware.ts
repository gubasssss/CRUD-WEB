import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    username: string;
    tipo: string;
    iat: number;
    exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const [, token] = authorization.split(' ');

    try {
        const data = jwt.verify(token, 'seu_segredo_jwt');
        const { username, tipo } = data as TokenPayload;
        
        req.user = { username, tipo }; 
        return next();
    } catch {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};