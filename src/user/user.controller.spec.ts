import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, PrismaService],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userController = moduleRef.get<UserController>(UserController);
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = [
                {
                    profile: {
                        id: 3,
                        name: "Test User",
                        email: "tessst@gmail.com",
                        phone: "+989379451234",
                        age: 20,
                        userId: 3
                    },
                    posts: [],
                    id: 3
                }
            ];
            jest.spyOn(userService, 'findAll').mockImplementation(async() => result);

            expect(await userController.findAll()).toBe(result);
        });
    });
});