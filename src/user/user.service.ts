import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../auth/role.enum';

@Injectable()
export class UserService implements OnModuleInit {
	constructor(
		private prisma: PrismaService
	) { }
	private readonly logger = new Logger(UserService.name);

	async onModuleInit() {
		await this.createDefaultAdmin();
	}

	private async createDefaultAdmin() {
		const admin = await this.prisma.user.findUnique({
			where: {
				username: process.env.ADMIN_USERNAME
			}
		});

		if (!admin) {
			try {
				await this.create({
					age: 20,
					username: process.env.ADMIN_USERNAME,
					email: "admin@gmail.com",
					name: "admin",
					password: process.env.ADMIN_PASSWORD,
					role: Role.Admin,
					phone: "+989999999999",
				});
				console.log(`Default admin user created: ${process.env.ADMIN_USERNAME}`);
			} catch (error) {
				console.log("Failed to create default user. Probably its existed.");
			}
		}
	}

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
