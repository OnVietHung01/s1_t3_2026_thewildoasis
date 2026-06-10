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

type User = {
  id: number;
  fullName: string;
};
@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: 1, fullName: 'Hung' },
    { id: 2, fullName: 'Viet' },
    { id: 3, fullName: 'On' },
    { id: 4, fullName: 'Van' },
    { id: 5, fullName: 'Ly' },
  ];
  // @Get()
  // getUsers() {
  //   return [
  //     { id: 1, fullName: 'Hung' },
  //     { id: 2, fullName: 'Viet' },
  //     { id: 3, fullName: 'On' },
  //     { id: 4, fullName: 'Van' },
  //     { id: 5, fullName: 'Ly' },
  //   ];
  // }

  // cách 1 : truyền thông qua query
  @Get() // => /users?key=somthing
  getUsers(@Query('name') query) {
    console.log('>>> query', query); // query.fullname
    return this.users;
    // [
    //   { id: 1, fullName: 'Hung' },
    //   { id: 2, fullName: 'Viet' },
    //   { id: 3, fullName: 'On' },
    //   { id: 4, fullName: 'Van' },
    //   { id: 5, fullName: 'Ly' },
    // ];
  }
  // cách 2: truyền thông qua path param
  @Get(':id') // => /users/id
  getUser(@Param('id') id: string) {
    // console.log('>>> param', id);
    const userFound = this.users.find((user) => user.id === parseInt(id));
    if (!userFound) {
      // throw new Error('user not found');
      return 'User not found in list user';
    }
    return userFound;
  }

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
    // Validate data
    if (typeof userCreate.id !== 'number') {
      return 'id must be a number';
    }
    if (typeof userCreate.fullName !== 'string') {
      return 'fullName must be a string';
    }
    // Create new data
    // Thêm user mới vào cuối mảng
    this.users.push(userCreate);
    return userCreate;
  }

  @Patch(':id')
  updateUsers(@Param('id') id: string, @Body() userUpdate: User) {
    // User exist
    const userFound = this.users.find((user) => user.id === parseInt(id));
    if (!userFound) {
      throw new Error('user not found');
      // return 'User not found in list user';
    }
    // Validate data
    if (
      userUpdate.fullName !== undefined &&
      typeof userUpdate.fullName !== 'string'
    ) {
      return 'fullName must be a string';
    }

    // Update data
    const UpdateUser = this.users.map((user) => {
      if (user.id === userFound.id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    this.users = UpdateUser;
    return userUpdate;
  }

  @Delete(':id')
  deleteUsers(@Param('id') id: string) {
    // User exist
    const userDeleted = this.users.find((user) => user.id === parseInt(id));
    if (!userDeleted) {
      throw new Error('user not found');
      // return 'User not found in list user';
    }
    // Delete data
    const DeleteUser = this.users.filter((user) => user.id !== userDeleted.id);
    // danh sách user hiện tại = danh sách user sau khi đã delete
    this.users = DeleteUser;
    return userDeleted;
  }
}
