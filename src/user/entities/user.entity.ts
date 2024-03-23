import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Endereco_user } from './endereco_user.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primeiro_nome: string;

  @Column()
  ultimo_nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  data_nascimento: string;

  @Column()
  tipo_usuario: string;

  @Column()
  empresa: string;

  @Column()
  cpf: string;

  @Column()
  imagem: string;

  @Column()
  telefone: string;

  @Column()
  password: string;

  @OneToOne(() => Endereco_user)
  @JoinColumn()
  endereco: Endereco_user;
}



