import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser();
  }

  @Get(":id")
  getUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Patch('profile/:id')
  updateUserProfile(@Param('id') id: number, @Body() data: any) {
    return this.userService.updateUserProfile(id, data);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}