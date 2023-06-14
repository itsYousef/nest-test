import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService
	) { }
	private readonly logger = new Logger(UserService.name);

	async create(input: CreateUserDto) {
		const { age, email, name, phone, password, username } = input;

		const user = await this.prisma.user.create({
			data: {
				profile: {
					create: {
						age,
						email,
						name,
						phone
					}
				},
				password,
				username
			}
		})

		return user;
	}

	findAll() {
		// this.logger.log("TEST logger")
		return this.prisma.user.findMany({
			select: {
				profile: true,
				posts: true,
				id: true
			}
		})
	}

	findOne(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				profile: true,
				posts: true,
				id: true
			}
		})
	}

	findByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: {
				username
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
