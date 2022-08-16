import { Router } from 'express';

import UsersController from '../../controllers/UsersController';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const usersController = new UsersController();

const usersRouter = Router();

// usersRouter.use(ensureAuthenticated);

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.list);
usersRouter.put('/:id', usersController.update);

export default usersRouter;
