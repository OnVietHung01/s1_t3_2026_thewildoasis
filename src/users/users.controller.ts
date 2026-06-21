import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Put,
  Query,
} from '@nestjs/common';
import type { User } from './users.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // nhiệm vụ chỉ gọi đến UsersService
  // cách 1 : truyền thông qua query
  @Get() // => /users?key=somthing
  getUsers(@Query('name') query) {
    return this.usersService.getUsers(query);
  }
  // Chỉ có nhiệm vụ nhận query và chuyển xuống Service.
  // cách 2: truyền thông qua path param
  @Get(':id') // => /users/id
  getUser(@Param('id') id: string) {
    // console.log('>>> param', id);
    // const userFound = this.users.find((user) => user.id === parseInt(id));
    // if (!userFound) {
    //   // throw new Error('user not found');
    //   return 'User not found in list user';
    // }
    return this.usersService.getUser(id);
  }
  // Chỉ có nhiệm vụ nhận query và chuyển xuống Service.

  // @Get(':id') @Query('name') query)
  // getUser(@Param('id') id) {
  //   console.log('>>> query', id);
  //   return [
  //     { id: 1, fullname: 'hung' },
  //     { id: 2, fullname: 'hao' },
  //   ];
  // }

  @Post()
  createUser(@Body() userCreate: User) {
    return this.usersService.createUser(userCreate);
  }
  // Controller chịu trách nhiệm lấy dữ liệu từ Request

  @Patch(':id')
  updateUsers(@Param('id') id: string, @Body() userUpdate: User) {
    return this.usersService.updateUsers(id, userUpdate);
  }

  @Delete(':id')
  deleteUsers(@Param('id') id: string) {
    // User exist
    // const userDeleted = this.users.find((user) => user.id === parseInt(id));
    // if (!userDeleted) {
    //   throw new Error('user not found');
    //   // return 'User not found in list user';
    // }
    // // Delete data
    // const DeleteUser = this.users.filter((user) => user.id !== userDeleted.id);
    // // danh sách user hiện tại = danh sách user sau khi đã delete
    // this.users = DeleteUser;
    return this.usersService.deleteUsers(id);
  }
}
// Controller = giao tiếp với HTTP Request/Response => mới có:
// @Param()
// @Query()
// @Body()
// @Headers()
