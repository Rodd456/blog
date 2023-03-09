import { Router } from 'express';
import usersRouter from './users';
import postsRouter from './posts';
import homeRouter from './home-routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/post', postsRouter);
router.use('/', homeRouter);

export default router;
