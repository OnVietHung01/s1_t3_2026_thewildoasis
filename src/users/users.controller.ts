import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  @Get()
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
  @Get(':id')
  getUser(@Param('id') id) {
    // console.log('>>> param', id);
    const userFound = this.users.find((user) => user.id === parseInt(id));
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
  createUser() {}

  @Put()
  updateUsers() {}

  @Delete()
  deleteUsers() {}
}
