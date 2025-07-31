import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const existingUsers = await userRepository.find();
    if (existingUsers.length > 0) {
      console.log('Categories already exist, skipping seeding.');
      return;
    }

    const categoryData: CreateUserDto[] = [
      //  user data
    ];
    await userRepository.save(categoryData);
    console.log('Category seeding successful!');
  }
}