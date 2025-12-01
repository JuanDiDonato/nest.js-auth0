import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseSchema } from 'node_modules/auth0/dist/cjs/management/api';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async listAllUsers(
    @Query('page') page: number,
  ): Promise<UserResponseSchema[]> {
    return await this.usersService.getAllUsers(page);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponseSchema> {
    return await this.usersService.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseSchema> {
    return await this.usersService.updateUserById(id, updateUserDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.createUser(createUserDto);
  }
}
