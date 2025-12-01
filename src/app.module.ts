import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { Auth0ManagementModule } from './auth0-management/auth0-management.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    UsersModule,
    Auth0ManagementModule,
  ],
})
export class AppModule {}
