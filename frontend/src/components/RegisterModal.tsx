import React, { useState } from 'react';
import api from '../services/api';
import modalStyles from '../css/RegisterModal.module.css';
import formStyles from '../css/TasksPage.module.css'; 

interface RegisterModalProps {
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nome: '',
        tipo: '1' 
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/users', formData);
            setSuccess(`Usuário "${formData.username}" criado com sucesso!`);
            setFormData({ username: '', password: '', nome: '', tipo: '1' }); 
        } catch (err: any) {
            setError(err.response?.data?.message || 'Falha ao criar usuário.');
        }
    };

    return (
        <div className={modalStyles.overlay}>
            <div className={modalStyles.modal}>
                <button className={modalStyles.closeButton} onClick={onClose}>&times;</button>
                <h2 className={formStyles.title}>Cadastrar Novo Usuário</h2>
                <form onSubmit={handleSubmit} style={{display: 'contents'}}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className={formStyles.input} placeholder="Username" required />
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={formStyles.input} placeholder="Nome Completo" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={formStyles.input} placeholder="Senha" required />
                    <select name="tipo" value={formData.tipo} onChange={handleChange} className={formStyles.input}>
                        <option value="1">Usuário Comum</option>
                        <option value="0">Administrador</option>
                    </select>

                    {error && <p className={formStyles.error}>{error}</p>}
                    {success && <p className={modalStyles.success}>{success}</p>}

                    <button type="submit" className={formStyles.submitButton}>Cadastrar Usuário</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;