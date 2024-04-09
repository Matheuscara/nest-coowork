import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coowork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    logo: string;

    @Column()
    descricao: string;

    @Column()
    cafeteria: boolean;

    @Column()
    wifi: boolean;

    @Column()
    caixa_segura: boolean;

    @Column()
    email: string;
}