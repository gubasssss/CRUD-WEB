import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

interface User {
    username: string;
    nome: string;
    tipo: string;
}
interface DecodedToken extends User {
    iat: number;
    exp: number;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser({ username: decodedToken.username,nome: decodedToken.nome, tipo: decodedToken.tipo });
                api.defaults.headers.Authorization = `Bearer ${token}`;
            } else {
                localStorage.removeItem('authToken');
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser({ username: decodedToken.username,nome: decodedToken.nome, tipo: decodedToken.tipo });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        delete api.defaults.headers.Authorization;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};