import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { UserEntity } from '../user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: UserEntity[] = [];
    // Create a fake copy of the UsersService
    fakeUsersService = {
      find: (email: string) => {
        const results = users.filter((user) => user.email === email);
        return Promise.resolve(results);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        } as UserEntity;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('can create an instance of Auth Service ', async () => {
    expect(service).toBeDefined();
  });

  it('signs up a user with a hashed password', async () => {
    const user = await service.signup('test@test.com', 'password');
    expect(user.password).not.toEqual('password');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('test@test.com', 'password');

    await expect(service.signup('test@test.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if an signin email called with unused email', async () => {
    await expect(service.signin('test@test.com', 'password')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an signin email called with invalid password', async () => {
    await service.signup('test@test.com', 'password');

    await expect(
      service.signin('test@test.com', 'passwordNew'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is supplied', async () => {
    await service.signup('test@test.com', 'password');

    const user = await service.signin('test@test.com', 'password');

    expect(user).toBeDefined();
  });
});
