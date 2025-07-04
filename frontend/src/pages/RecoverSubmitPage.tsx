import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import styles from '../css/LoginPage.module.css'; 

const RecoverSubmitPage = () => {
    const { username } = useParams<{ username: string }>(); 
    const [message, setMessage] = useState('');

    const handleRecovery = async () => {
        try {
            const response = await api.post('/users/recover-password', { username });
            setMessage(response.data.message);
        } catch (err) {
            setMessage('Ocorreu um erro ao tentar iniciar a recuperação.');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Confirmar Recuperação</h2>
                <p className={styles.recoveryText}>
                    Tudo certo! Enviaremos (simulado) um e-mail de recuperação para o usuário: <strong>{username}</strong>.
                </p>
                
                {message ? (
                    <p className={styles.recoveryMessage}>{message}</p>
                ) : (
                    <div className={styles.buttonGroup}>
                        <button onClick={handleRecovery} className={styles.submitButton}>
                            Enviar Email de Recuperação
                        </button>
                    </div>
                )}
                 <Link to="/login" style={{textAlign: 'center', marginTop: '1rem'}}>Voltar para o Login</Link>
            </div>
        </div>
    );
};

export default RecoverSubmitPage;