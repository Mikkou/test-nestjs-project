import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
const fs = require('fs')

@Injectable()
export class UsersService {

  constructor (@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  async getUsers (params): Promise<User[]> {
    return await this.usersRepository.find({
      where: params.filterKey ? [{ [params.filterKey]: params.filterValue }] : []
    })
  }

  async getUser (_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstName', 'lastName', 'gender', 'birthday', 'avatar', 'id'],
      where: [{ 'id': _id }]
    })
  }

  async createUser (user: User) {
    return await this.usersRepository.save(user)
  }

  async updateUser ({ id, ...user }: User) {
    return await this.usersRepository.update(id, user)
  }

  async deleteUser (userId: number) {
    const users: User[] = await this.getUser(userId)
    try {
      fs.unlinkSync(users[0].avatar.replace('/users/', ''))
      //file removed
    } catch(err) {
      console.error(err)
    }
    return await this.usersRepository.delete(userId)
  }
}
