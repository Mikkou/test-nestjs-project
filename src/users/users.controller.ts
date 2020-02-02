import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { UsersService } from './users.service'
import { User } from './user.entity'

@Controller('users')
export class UsersController {

  constructor (private service: UsersService) {
  }

  @Get()
  getUsers (@Query() params) {
    return this.service.getUsers(params)
  }

  @Get(':id')
  get (@Param() params) {
    return this.service.getUser(params.id)
  }

  @Post()
  create (@Body() user: User) {
    return this.service.createUser(user)
  }

  @Put()
  update (@Body() user: User) {
    return this.service.updateUser(user)
  }

  @Delete(':id')
  deleteUser (@Param() params) {
    return this.service.deleteUser(params.id)
  }

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadAvatar (@Param('id') userId, @UploadedFile() file) {
    const users: User[] = await this.service.getUser(userId)
    const user = users[0]
    user.avatar = '/users/' + file.path
    return await this.service.updateUser(user)
  }

  @Get('uploads/:fileId')
  serveAvatar (@Param('fileId') fileId, @Res() res) {
    res.sendFile(fileId, { root: 'uploads' })
  }
}
