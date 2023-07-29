import express from 'express';
import userRouter from './users.route';
import concertRouter from './concerts.route';
import reservationRouter from './reservations.route';

const router = express.Router();

router.use('/users', userRouter);
router.use('/concerts', concertRouter);
router.use('/reservations', reservationRouter);
export default router;
