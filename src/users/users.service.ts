import { Inject, Injectable } from '@nestjs/common';
import { MANAGEMENT_CLIENT } from '../auth0-management/auth0-management.module';
import { ManagementClient } from 'auth0';
import { UserResponseSchema } from 'node_modules/auth0/dist/cjs/management/api';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly CONNECTION_TYPE: string = 'Username-Password-Authentication';

  constructor(
    @Inject(MANAGEMENT_CLIENT)
    private readonly managementClient: ManagementClient,
  ) {}

  async getAllUsers(page: number = 0): Promise<UserResponseSchema[]> {
    console.info(`Getting users from page ${page}`);
    try {
      const usersResult = await this.managementClient.users.list({
        page: page,
        per_page: 20,
        include_totals: true,
      });
      console.log(`Found ${usersResult.response.length} users`);
      return usersResult.response.users ?? [];
    } catch (error) {
      console.error('Fail to get users', error);
      throw new Error('Fail to get users');
    }
  }

  async getUserById(id: string): Promise<UserResponseSchema> {
    console.info(`Getting user with id ${id}`);
    try {
      const userResult = await this.managementClient.users.get(id);
      return userResult;
    } catch (error) {
      console.error('Fail to get user', error);
      throw new Error('Fail to get users');
    }
  }

  async updateUserById(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserResponseSchema> {
    console.info(`Updating user with id ${id}`);
    try {
      const userResult = await this.managementClient.users.update(id, {
        email: data.email,
        name: data.name,
      });
      return userResult;
    } catch (error) {
      console.error('Fail to update user', error);
      throw new Error('Fail to update user');
    }
  }

  async deleteUserById(id: string): Promise<void> {
    console.info(`Deleting user with id ${id}`);
    try {
      await this.managementClient.users.delete(id);
    } catch (error) {
      console.error('Fail to delete user', error);
      throw new Error('Fail to delete user');
    }
  }

  async createUser(data: CreateUserDto): Promise<void> {
    try {
      const userCreationResult = await this.managementClient.users.create({
        connection: this.CONNECTION_TYPE,
        email: data.email,
        name: data.name,
        password: process.env.USER_DEFAULT_PASSWORD,
      });
      console.log(userCreationResult);
    } catch (error) {
      console.error(error);
      throw new Error('Fail to create user');
    }
  }
}
