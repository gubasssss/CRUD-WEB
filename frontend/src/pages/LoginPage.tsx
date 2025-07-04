import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; 
import api from '../services/api';
import styles from '../css/LoginPage.module.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginAttempts, setLoginAttempts] = useState(0);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/login', { username, password });
            login(response.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Falha no login.');
            setLoginAttempts(prev => prev + 1);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Acessar o Sistema</h2>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Usuário:</label>
                        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Senha:</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className={styles.input} required />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}
                    
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Entrar</button>
                    </div>
                </form>
                
                {loginAttempts >= 2 && (
                     <div className={styles.recoverySection}>
                        <p className={styles.recoveryText}>Problemas para entrar?</p>
                        <Link to="/recover-username" className={styles.recoveryButton}>
                            Recuperar Senha
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;