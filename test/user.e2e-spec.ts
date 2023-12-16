import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';

describe('Users', () => {
    let app: INestApplication;
    const userService = {
        findAll: () => [
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
        ]
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserModule],
        })
            .overrideProvider(UserService)
            .useValue(userService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET user`, () => {
        return request(app.getHttpServer())
            .get('/user')
            .expect(200)
            .expect(userService.findAll());
    });

    afterAll(async () => {
        await app.close();
    });
});