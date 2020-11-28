import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get, ClassSerializerInterceptor, UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './passport/local-authentication.guard';
import { UsersService } from '../users/users.service';
import JwtAuthenticationGuard from './passport/jwt-authentication.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService

  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    return this.authenticationService.login(request.user)
  }
}
