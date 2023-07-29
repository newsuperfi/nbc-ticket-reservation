import { AppDataSource } from '../data-source';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/User';

// export class UserRepository extends Repository<User> {
//   // 이 클래스 자체가 User가 됨
//   // public userRepo = AppDataSource.getRepository(User); User를 불러와서 userRepo에 할당함
//   signUp = async (email: string, password: string, nickname: string, introduction: string) => {
//     const userSignup = { email, password, nickname, introduction };
//     return this.save(userSignup);
//   };
// }
export class UserRepository {
  // User를 불러와서 userRepo에 할당함
  private userRepo = AppDataSource.getRepository(User);

  public signUp = async (
    email: string,
    password: string,
    nickname: string,
    introduction: string
  ) => {
    return this.userRepo.save({ email, password, nickname, introduction });
  };

  public findByEmail = async (email: string) => {
    return this.userRepo.findOneBy({ email });
  };

  public findById = async (id: number) => {
    return this.userRepo.findOne({
      where: { id },
      select: { id: true, email: true, nickname: true, point: true, is_admin: true },
    });
  };
}
