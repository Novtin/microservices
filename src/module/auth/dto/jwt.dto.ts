import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class JwtDto {
  @ApiProperty({
    type: String,
    description: 'access JWT',
    required: true,
  })
  @Type(() => String)
  @IsString()
  access: string;
  @ApiProperty({
    type: String,
    description: 'refresh JWT',
    required: true,
  })
  @Type(() => String)
  @IsString()
  refresh: string;
}

export class RefreshJwtDto {
  @ApiProperty({
    type: String,
    description: 'refresh JWT',
    required: true,
  })
  @Type(() => String)
  @IsString()
  readonly refresh: string;
}
