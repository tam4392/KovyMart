import { User } from './../entities/user.entity';
export interface JwtPayload {
  user: User;
}
