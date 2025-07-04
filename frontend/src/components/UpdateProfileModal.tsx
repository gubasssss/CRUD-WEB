import React, { useState } from 'react';
import api from '../services/api';
import modalStyles from '../css/UpdateProfileModal.module.css';
import formStyles from '../css/TasksPage.module.css';
import { useAuth } from '../contexts/AuthContext';

interface UpdateProfileModalProps {
    onClose: () => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ onClose }) => {
    const { user } = useAuth(); 
    const [formData, setFormData] = useState({
        nome: user?.nome || '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const payload: { nome: string; password?: string } = {
                nome: formData.nome,
            };
            if (formData.password) {
                payload.password = formData.password;
            }

            await api.put('/users/me', payload);
            setSuccess('Informações atualizadas com sucesso!');
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err: any) {
            setError(err.response?.data?.message || 'Falha ao atualizar informações.');
        }
    };

    return (
        <div className={modalStyles.overlay}>
            <div className={modalStyles.modal}>
                <button className={modalStyles.closeButton} onClick={onClose}>&times;</button>
                <h2 className={formStyles.title}>Editar Perfil</h2>
                <form onSubmit={handleSubmit} style={{display: 'contents'}}>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={formStyles.input} placeholder="Nome Completo" required />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={formStyles.input} placeholder="Nova Senha (deixe em branco para não alterar)" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={formStyles.input} placeholder="Confirmar Nova Senha" />
                    
                    {error && <p className={formStyles.error}>{error}</p>}
                    {success && <p className={modalStyles.success}>{success}</p>}

                    <button type="submit" className={formStyles.submitButton}>Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;