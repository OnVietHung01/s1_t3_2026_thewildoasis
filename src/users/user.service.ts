import { Body, Injectable, NotFoundException } from '@nestjs/common';
import type { User } from './users.entity';

@Injectable()
export class UsersService {
  // getHello(): string {
  //   return 'Hello Ôn Việt Hùng update';
  // }

  private users: User[] = [
    { id: 1, fullName: 'Hung' },
    { id: 2, fullName: 'Viet' },
    { id: 3, fullName: 'On' },
    { id: 4, fullName: 'Van' },
    { id: 5, fullName: 'Ly' },
  ];

  // cách 1 : truyền thông qua query
  // => /users?key=somthing
  // getUsers(query) {
  //   console.log('>>> query', query); // query.fullname
  //   return this.users;
  // }

  getUsers(query: string) {
    console.log('>>> query', query);

    if (!query) {
      return this.users;
    }

    return this.users.filter((user) => user.fullName === query);
  }

  // cách 2: truyền thông qua path param
  // => /users/id
  getUser(id: string) {
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

  createUser(userCreate: User) {
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

  updateUsers(id: string, userUpdate: User) {
    // User exist
    const userFound = this.users.find((user) => user.id === parseInt(id));
    if (!userFound) {
      throw new NotFoundException('user not found');
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

  deleteUsers(id: string) {
    // User exist
    const userDeleted = this.users.find((user) => user.id === parseInt(id));
    if (!userDeleted) {
      throw new Error('user not found');
    }
    // Delete data
    const DeleteUser = this.users.filter((user) => user.id !== userDeleted.id);
    // danh sách user hiện tại = danh sách user sau khi đã delete
    this.users = DeleteUser;
    return userDeleted;
  }
}
/**
 *Service = business logic
Nên chỉ nhận dữ liệu thuần:
updateUsers(id, userUpdate)
 */
