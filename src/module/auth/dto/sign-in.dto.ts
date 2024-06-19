import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SignInDto {
  @ApiProperty({
    description: 'Логин',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Поле login должно быть заполнено' })
  @IsString({ message: 'Поле login должно быть строкой' })
  @Type(() => String)
  readonly login: string;

  @ApiProperty({
    description: 'Пароль',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Поле password должно быть заполнено' })
  @IsString({ message: 'Поле password должно быть строкой' })
  @Type(() => String)
  readonly password: string;
}
