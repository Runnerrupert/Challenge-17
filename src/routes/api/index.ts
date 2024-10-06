import { Router } from 'express';
import { userRouter } from './userRouter.js';
import { thoughtRouter } from './thoughtRouter.js';
import { reactionRouter } from './reactionRouter.js';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);
router.use('/reactions', reactionRouter);

export default router;
