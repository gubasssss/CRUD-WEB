import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity('usuarios')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    username!: string;

    @Column({ type: 'varchar', length: 128, select: false })
    password!: string;

    @Column({ type: 'varchar', length: 120 })
    nome!: string;

    @Column({ type: 'varchar', unique: true, nullable: true }) // Adicionado
    email!: string | null;

    @Column({ type: 'char', length: 1 })
    tipo!: string;

    @Column({ type: 'char', length: 1, default: 'A' })
    status!: string;

    @Column({ name: 'quant_acesso', type: 'int', default: 0 })
    quantAcesso!: number;

    @Column({ name: 'failed_login_attempts', type: 'int', default: 0 })
    failedLoginAttempts!: number;

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
}