import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService
	) { }
	private readonly logger = new Logger(UserService.name);

	async create(input: CreateUserDto) {
		const { age, email, name, phone, password, username, role } = input;

		// todo: use try catch for database errors
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
				username,
				role
			}
		})

		return user;
	}

	async findAll() {
		// this.logger.log("TEST logger")
		return await this.prisma.user.findMany({
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
		const { age, email, name, phone, role } = updateUserDto;

		return this.prisma.user.update({
			data: {
				profile: {
					update: {
						age,
						email,
						name,
						phone
					}
				},
				role
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
