import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../css/LoginPage.module.css'; 
const RecoverUsernamePage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/users/verify-username', { username });
            navigate(`/recover-submit/${username}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao verificar usuário.');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Recuperar Senha</h2>
                <p className={styles.recoveryText}>Digite seu nome de usuário para continuar.</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Nome de Usuário:</label>
                        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className={styles.input} required />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>Verificar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecoverUsernamePage;