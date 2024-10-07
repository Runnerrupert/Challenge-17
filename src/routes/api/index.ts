import { Router } from 'express';
import { userRouter } from './userRouter.js';
import { thoughtRouter } from './thoughtRouter.js';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);

export default router;
