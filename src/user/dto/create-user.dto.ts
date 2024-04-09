import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from '@nestjs/class-validator';
import { IsEqualTo } from 'src/utils/class_validators/IsEqualTo.validator';

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

  @IsOptional()
  tipo_usuario: string;

  @IsOptional()
  empresa?: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  imagem?: string;

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

  // @IsDefined()
  // @IsNotEmptyObject()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => EnderecoDto)
  // endereco: EnderecoDto;
}
