import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateCooworkDto {
  @IsString()
  nome: string;

  @IsString()
  logo: string;

  @IsString()
  descricao: string;

  @IsBoolean()
  cafeteria: boolean;

  @IsBoolean()
  wifi: boolean;

  @IsBoolean()
  caixa_segura: boolean;

  @IsEmail()
  email: string;
}

