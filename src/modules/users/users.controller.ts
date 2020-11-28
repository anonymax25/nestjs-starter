import { UsersService } from './users.service';
import { Controller, Req, UseGuards, Get, Put, Body } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import User from 'entities/user/user.entity';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
  
  @UseGuards(JwtAuthenticationGuard)
  @Put()
  update(@Req() req: RequestWithUser, @Body() user: User) {
    return this.usersService.update(user, req.user.id);
  }
}
