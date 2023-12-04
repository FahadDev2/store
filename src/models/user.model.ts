import User from '../types/user.type';
import database from '../database';
import bcrypt from 'bcrypt';
import config from '../envConfig/config';

const hasing = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(`${password}${config.b_pass}`, salt);
};

class UserModel {
  //create

  async create(user: User): Promise<User> {
    try {
      //open connection with db
      const db = await database.connect();

      const sql = `INSERT INTO users ( email, user_name, first_name, last_name, password) 
      values ($1, $2,$3, $4,$5) returning id, user_name, email `;
      //run the query to create user
      const result = await db.query(sql, [
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        hasing(user.password),
      ]);
      //important to relase connection
      db.release();
      //return user crearted
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create ( ${user.user_name ? user.user_name : 'user'} : ${
          error as Error
        } )`
      );
    }
  }

  //get all users

  // get specific user

  //update user

  // delete user

  //authiuntcate user
}

export default new UserModel();
