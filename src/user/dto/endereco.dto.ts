import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class EnderecoDto {
  @IsNotEmpty()
  @IsString()
  public rua: string;

  @IsNotEmpty()
  @IsString()
  public bairro: string;

  @IsNotEmpty()
  @IsString()
  public cep: string;

  @IsNotEmpty()
  @IsString()
  public cidade: string;

  @IsNotEmpty()
  @IsString()
  public pais: string;

  @IsNotEmpty()
  @IsString()
  public numero: string;

  @IsNotEmpty()
  @IsString()
  public complemento: string;
}