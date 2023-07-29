import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/users.repository';

// 사용자 인증 미들웨어
export default async (req: Request, res: Response, next: NextFunction) => {
  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
    return;
  }

  try {
    const userRepository = new UserRepository();
    // any말고 제대로 타입을 지정하는 방법은 뭘까
    const { userId }: any = jwt.verify(authToken, 'jwt-secret-key');
    const user = await userRepository.findById(userId);
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};
