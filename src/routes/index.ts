import { Router } from 'express';
import usersRouter from './users/users.routes';
import sessionsRouter from './users/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
