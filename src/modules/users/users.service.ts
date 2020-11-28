import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import User from '../../entities/user/user.entity';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor() {}

  async getByEmail(email: string) {
    const user: User = await getConnection("POSTGRES")
      .getRepository(User)
      .createQueryBuilder()
      .where('email = :value', {value: email})
      .getOne();
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getById(id: number) {
    const user: User = await getConnection("POSTGRES")
      .getRepository(User)
      .createQueryBuilder()
      .where('id = :value', {value: id})
      .getOne();
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async create(user: CreateUserDto) {
    try {
      const check = await this.getByEmail(user.email);
      return null
    } catch (error) {  
    }

    await getConnection("POSTGRES")
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .onConflict(`("email") DO NOTHING`)
      .execute();
    return await this.getByEmail(user.email)
  }
  
  async update(newUser: User, id: number) {
    let user = await this.getById(id);
    user.email = newUser.email ? newUser.email : user.email;
    user.name = newUser.name ? newUser.name : user.name;
    return await getConnection("POSTGRES").manager.save(user);
  }
}
