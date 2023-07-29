import express from 'express';
import { UserController } from '../controllers/users.controller';
import auth from '../middlewares/auth.middleware';

const router = express.Router();

const userController = new UserController();
// 회원가입
router.post('/signup', userController.signUp);
// 로그인
router.post('/login', userController.login);
// 프로필 조회
router.get('/profile', auth, userController.profile);
// 예매 내역 확인
router.get('/reservation/list');
export default router;
