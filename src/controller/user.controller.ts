import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import User from '../types/user.type';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    // const { email, user_name, first_name, last_name, password }: User =  req.body;

    //we have to add some valdtion for the incomind data in body
    try {
      // await here to wait the resualt cpming from  user
      const user = await UserModel.create(req.body);

      res
        .status(200)
        .json({
          message: 'user created sucssfully',
          user: user,
        })
        .end();
    } catch (error) {
      //do i want to return error
      //or i did error already !
      //cuz i made error Handling
      //All I want to use next with error in params
      next(error);
    }
  }
}

export default new UserController();
