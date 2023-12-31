import { Router } from 'express';
import usersRoute from './api/user.routes';
const routes = Router();

routes.use('/users', usersRoute);

export default routes;
