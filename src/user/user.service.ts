import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(input: CreateUserDto) {
        const { age, email, name, phone } = input;

        const user = await this.prisma.user.create({
            data: {
                profile: {
                    create: {
                        age,
                        email,
                        name,
                        phone
                    }
                }
            }
        })

        return user;
    }

    findAll() {
        return this.prisma.user.findMany({
            include: {
                posts: true,
                profile: true
            }
        })
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                posts: true,
                profile: true
            }
        })
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const { age, email, name, phone } = updateUserDto;

        return this.prisma.user.update({
            data: {
                profile: {
                    update: {
                        age,
                        email,
                        name,
                        phone
                    }
                }
            },
            where: {
                id
            }
        })
    }

    remove(id: number) {
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
