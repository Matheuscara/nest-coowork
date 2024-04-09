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
    return await this.userRepository.save(body);
  }

  async findOne(options) {
    return await this.userRepository.findOne(options);
  }

  async update(id, body) {
    return await this.userRepository.update(id, body);
  }
}
