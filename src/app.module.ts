import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { User } from './entities/user/user.entity';
import { ConnectionOptions } from 'typeorm';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi'

// const {
//   ENV,
//   POSTGRES_DB,
//   POSTGRES_HOST,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_PORT,
//   JWT_SECRET,
//   JWT_EXPIRATION_TIME
// } = process.env;


const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env

const POSTGRES_DB_CONFIG: ConnectionOptions = {
  name: "POSTGRES",
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: ['error'],
  entities: [User],
  synchronize: true
};
@Module({
  imports: [
    TypeOrmModule.forRoot(POSTGRES_DB_CONFIG),
    AuthenticationModule,
    UsersModule    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
