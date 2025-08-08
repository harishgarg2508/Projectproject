import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role, User } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

class HashingService {
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

}

export class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const hashingService = new HashingService();


    const admins: CreateUserDto[] = [
      {
        username: 'admin1',
        email: 'admin1@gmail.com',
        password: 'admin1',
        role: Role.ADMIN
      },
      {
        username: 'admin2',
        email: 'admin2@gmail.com',
        password: 'admin2', 
        role: Role.ADMIN
      },
      {
        username: 'admin3',
        email: 'admin3@gmail.com',
        password: 'admin3',
        role: Role.ADMIN
      },
      {
        username: 'admin4',
        email: 'admin4@gmail.com',
        password: 'admin4',
        role: Role.ADMIN
      },
      {
        username: 'admin5',
        email: 'admin5@gmail.com',
        password: 'admin5',
        role: Role.ADMIN
      },
      {
        username: 'admin6',
        email: 'admin6@gmail.com',
        password: 'admin6',
        role: Role.ADMIN
      }

    ];

    const adminData: CreateUserDto[] = []
    for (const admin of admins) {
      const hashedPassword = await hashingService.hashPassword(admin.password);
      adminData.push({
        username: admin.username,
        email: admin.email,
        password: hashedPassword,
        role: Role.ADMIN
      })
    }

    await userRepository.save(adminData);

    console.log('Admin seeding successful!');
  }
}