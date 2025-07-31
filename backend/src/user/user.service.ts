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
  

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

 
  async updateUserProfile(id:number,data:any){
    const{image_url} = data
    const user =  await this.userRepository.findOneBy({id})
    if(!user){
      throw new BadRequestException('User not found')
    }
    user.avatar = image_url
    console.log(image_url)

    await this.userRepository.save(user)
    return user.avatar

  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }
}
