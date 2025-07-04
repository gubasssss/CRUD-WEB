import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/TasksPage.module.css';
import RegisterModal from '../components/RegisterModal'; 
import UpdateProfileModal from '../components/UpdateProfileModal'; 


interface Task {
    id: number;
    title: string;
    description: string | null;
}

const TasksPage = () => {
    const { user, logout } = useAuth(); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [tasks, setTasks] = useState<Task[]>([]);
    const [formState, setFormState] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 


    useEffect(() => {
        api.get('/tasks').then(response => setTasks(response.data));
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTask) { 
            const response = await api.put(`/tasks/${editingTask.id}`, formState);
            setTasks(tasks.map(t => (t.id === editingTask.id ? response.data : t)));
            setEditingTask(null);
        } else { 
            const response = await api.post('/tasks', formState);
            setTasks([...tasks, response.data]);
        }
        setFormState({ title: '', description: '' });
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setFormState({ title: task.title, description: task.description || '' });
    };

    const handleDelete = async (id: number) => {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(t => t.id !== id));
    };
    
    const cancelEdit = () => {
        setEditingTask(null);
        setFormState({ title: '', description: '' });
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h2 className={styles.title}>Painel de Tarefas</h2>
                <div className={styles.headerActions}> 


                 <button onClick={() => setIsProfileModalOpen(true)} className={styles.editButton}>
                        Editar Perfil
                    </button>
                    

                    {user?.tipo === '0' && (
                        <button onClick={() => setIsRegisterModalOpen(true)} className={styles.submitButton}>
                            + Cadastrar Usuário
                        </button>
                    )}
                    <button onClick={() => { logout(); }} className={styles.logoutButton}>Logout</button>
                </div>
            </header>
            
            {isModalOpen && <RegisterModal onClose={() => setIsModalOpen(false)} />}
            {isRegisterModalOpen && <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />}
            {isProfileModalOpen && <UpdateProfileModal onClose={() => setIsProfileModalOpen(false)} />}

            <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
                <input 
                    name="title" 
                    value={formState.title} 
                    onChange={handleFormChange} 
                    placeholder="Título" 
                    className={styles.input}
                    required 
                />
                <textarea 
                    name="description" 
                    value={formState.description} 
                    onChange={handleFormChange} 
                    placeholder="Descrição"
                    className={styles.textarea}
                />
                <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                        {editingTask ? 'Salvar' : 'Adicionar'}
                    </button>
                    {editingTask && (
                        <button type="button" onClick={cancelEdit} className={styles.cancelButton}>
                            Cancelar Edição
                        </button>
                    )}
                </div>
            </form>

            <ul className={styles.taskList}>
                {tasks.map(task => (
                    <li key={task.id} className={styles.taskItem}>
                        <div className={styles.taskContent}>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                        </div>
                        <div className={styles.taskActions}>
                            <button onClick={() => handleEdit(task)} className={styles.editButton}>Editar</button>
                            <button onClick={() => handleDelete(task.id)} className={styles.deleteButton}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TasksPage;