import { Router, Request, Response } from 'express';
import controller from '../../controller/user.controller';
const routes = Router();

routes.post('/add', controller.createUser);

routes.post('/auth', controller.auth);

export default routes;
