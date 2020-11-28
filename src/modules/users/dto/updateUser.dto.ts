import { IsNotEmpty } from "class-validator";
import User from "entities/user/user.entity";

export class UpdateUserDto {
    @IsNotEmpty()
    user: User
  }
  
export default UpdateUserDto;