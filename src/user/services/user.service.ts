import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Endereco_user } from '../entities/endereco_user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @InjectRepository(Endereco_user)
    protected readonly endereco_userRepository: Repository<Endereco_user>,
  ) {}

  async createUser(body) {
    // Create endereco
    const { endereco, password_confirmation, ...user } = body;

    const EnderecoEntity = new Endereco_user();

    Object.assign(EnderecoEntity, endereco);

    const resultEndereco =
      await this.endereco_userRepository.save(EnderecoEntity);

    // Create User with endereco
    const UserEntity = new User();

    Object.assign(UserEntity, user);

    UserEntity.endereco = resultEndereco;

    return await this.userRepository.save(UserEntity);
  }

  async findOne(options) {
    return await this.userRepository.findOne(options);
  }

  async update(id, body) {
    return await this.userRepository.update(id, body);
  }
}
