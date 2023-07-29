import { UserRepository } from '../repositories/users.repository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();

  public signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    nickname: string,
    introduction: string
  ) => {
    if (!email || !password || !confirmPassword || !nickname) {
      throw new Error('내용을 모두 입력해주세요');
    } else if (password !== confirmPassword) {
      throw new Error('비밀번호를 확인해주세요');
    }
    const exUser = await this.userRepository.findByEmail(email);
    if (exUser) {
      throw new Error('이미 존재하는 회원입니다');
    }
    const encrypted = await bcrypt.hash(password, 10);
    const result = await this.userRepository.signUp(email, encrypted, nickname, introduction);
    console.log('result', result);
    if (!result) {
      throw new Error('회원가입에 실패했습니다.');
    }
    return { code: 201, message: '회원가입 성공' };
  };

  public login = async (
    email: string,
    password: string
  ): Promise<{ token: string; code: number; message: string }> => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('없는 회원입니다.');
    }

    const pwCheck: boolean = await bcrypt.compare(password, user.password);
    console.log(pwCheck);
    if (!pwCheck) {
      throw new Error('비밀번호를 확인해주세요');
    } else {
      const token = jwt.sign({ userId: user.id }, 'jwt-secret-key');
      return { token, code: 200, message: '로그인에 성공했습니다.' };
    }
  };

  public profile = async (userId: number) => {
    const result = await this.userRepository.findById(userId);
    if (!result) {
      throw new Error('없는 회원입니다.');
    }
    return { result, code: 200 };
  };
}
