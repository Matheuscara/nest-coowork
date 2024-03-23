import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsEqualTo } from 'src/utils/class_validators/IsEqualTo.validator';
import { EnderecoDto } from './endereco.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  primeiro_nome: string;

  @IsNotEmpty()
  @IsString()
  ultimo_nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  data_nascimento: string;

  @IsNotEmpty()
  @IsString()
  tipo_usuario: string;

  @IsNotEmpty()
  @IsString()
  empresa: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  imagem: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEqualTo('password', { message: 'Confirm Password must match Password' })
  password_confirmation: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => EnderecoDto)
  endereco: EnderecoDto;
}

