import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() getUserFilterDto: GetUserFilterDto,
  ): Promise<{ items: UserDto[]; total: number }> {
    return this.userService.findAll(getUserFilterDto);
  }

  @Get(':login')
  findByLogin(@Param('login') login: string) {
    return this.userService.findByLogin(login);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('/check/verification')
  @UsePipes(new ValidationPipe({ transform: true }))
  verification(@Query() dto: SignInDto): Promise<boolean> {
    return this.userService.verification(dto);
  }
}
