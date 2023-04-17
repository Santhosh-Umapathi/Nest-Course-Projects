import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //Check if user exists
    const users = await this.usersService.find(email);
    if (users.length) {
      //If user exists, throw an error
      throw new BadRequestException('Email in use');
    }

    //--Hash password--//
    //Generate salt
    const salt = randomBytes(8).toString('hex');

    //Hash password with salt
    const hash = (await scryptAsync(password, salt, 32)) as Buffer;

    //Join salt and hash
    const result = salt + '.' + hash.toString('hex');

    //Create user
    const user = await this.usersService.create(email, result);
    //Return user
    return user;
  }

  async signin(email: string, password: string) {
    //Find user
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //Split salt and hash
    const [salt, storedHash] = user.password.split('.');

    //Hash supplied password with salt
    const hash = (await scryptAsync(password, salt, 32)) as Buffer;

    //Compare stored hash with supplied hash
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials');
    }

    //Return user
    return user;
  }
}
