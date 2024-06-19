import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtDto, RefreshJwtDto } from './dto/jwt.dto';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: SignInDto): Promise<JwtDto> {
    return this.authService.login(dto);
  }

  @Post('/refresh/token')
  refreshToken(@Body() dto: RefreshJwtDto): Promise<JwtDto> {
    return this.authService.refreshToken(dto);
  }
}
