import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity('tarefas')
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: 'text',nullable: true })
    description!: string | null;
    
    @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'owner_username' })
    user!: User;

    @Column({ name: 'owner_username' })
    ownerUsername!: string;
}