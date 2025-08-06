import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from 'src/repository/user.repository';
import { HashingService } from 'src/hashing/hashing.service';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
  ) { }
 

  findUserById(id:number){
    return this.userRepository.findUserById(id)
  }

  createUser(){
    
  }
  

 async makeInactive(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.isActive === false) {
      throw new BadRequestException('User is already inactive');
    }
    return this.userRepository.makeInactive(id);
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }
}
