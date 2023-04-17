import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const users: UserEntity[] = [];

    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: '123',
        } as UserEntity);
      },
      find: (email: string) => {
        const results = users.filter((user) => user.email === email);
        return Promise.resolve(results);
      },
      // remove: (id: number) => {
      //   const results = users.filter((user) => user.id !== id);
      //   return Promise.resolve(results[0]);
      // },
      // update: (id: number, attrs: Partial<UserEntity>) => {
      //   const user = users.filter((user) => user.id === id);
      //   if (!user) {
      //     throw new Error('User not found');
      //   }
      //   Object.assign(user, attrs);
      //   return Promise.resolve(user);
      // },
      // create: (email: string, password: string) => {
      //   const user = {
      //     id: Math.floor(Math.random() * 999),
      //     email,
      //     password,
      //   } as UserEntity;
      //   users.push(user);
      //   return Promise.resolve(user);
      // },
    };

    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as UserEntity);
      },
      // signup: (email, password) => {
      //   return Promise.resolve(true);
      // },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users returns list of used emails', async () => {
    const users = await controller.findAllUsers('test@test.com');
    expect(users.length).toEqual(0);
    // expect(users[0].email).toEqual('test@test.com');
  });

  it('find user by id returns single user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it("find user by id returns undefined if user doesn't exist", async () => {
    fakeUsersService.findOne = (id: number) => {
      return Promise.resolve(null);
    };
    const user = await controller.findUser('999');
    expect(user).toBeNull();
  });

  it('signin returns a user if correct password is provided', async () => {
    const session = { userId: -10 };
    const user = await controller.signIn(
      { email: 'test@test.com', password: '12345' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
