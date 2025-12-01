import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Auth0ManagementModule } from '../auth0-management/auth0-management.module';

@Module({
  imports: [Auth0ManagementModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
