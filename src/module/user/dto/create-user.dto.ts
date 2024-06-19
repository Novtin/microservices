import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    required: true,
    type: String,
  }) // для Swagger
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    required: true,
    type: String,
  }) // для Swagger
  @Expose()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Логин пользователя',
    required: true,
    type: String,
  }) // для Swagger
  @Expose()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    required: true,
    type: String,
  }) // для Swagger
  phone: string;

  @ApiProperty({
    description: 'Имя пользователя',
    required: true,
    type: String,
  }) // для Swagger
  firstName: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    required: true,
    type: String,
  }) // для Swagger
  lastName: string;

  @ApiProperty({
    description: 'Отчество пользователя',
    required: true,
    type: String,
  }) // для Swagger
  middleName: string;

  @ApiProperty({
    description: 'E-mail пользователя',
    required: true,
    type: String,
  }) // для Swagger
  email: string;
}
