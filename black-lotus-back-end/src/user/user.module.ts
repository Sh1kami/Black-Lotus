import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { UserController } from './user.controller'
import { UserService } from './user.service'
export { UserService }

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService]
})
export class UserModule {}
