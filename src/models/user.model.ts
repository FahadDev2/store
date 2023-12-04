import User from '../types/user.type';
import database from '../database';
import bcrypt from 'bcrypt';
import config from '../envConfig/config';

const hashPassword = (password: string) => {
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
        hashPassword(user.password),
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
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      //first open db connection
      const connection = await database.connect();

      //check is incoming data present in db
      const sql = 'SELECT password from users WHERE email=($1)';

      //resutal from database

      const result = await connection.query(sql, [email]);

      //check resualt have length ?!
      if (result.rows.length > 0) {
        //get password from db
        const { password: hashpass } = result.rows[0];

        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.b_pass}`,
          hashpass
        );
        //if password match then go get data from db
        if (isPasswordValid) {
          //get dadat from db
          const userInfo = await connection.query(
            `SELECT id, user_name, first_name, last_name FROM users WHERE email=($1)`,
            [email]
          );
          return userInfo.rows[0];
        }
      }

      //if no user found in db
      //cut the connection wd database
      connection.release();
      return null;
      //second get password for incoming email in body
      //compare hased password in db with password in request
      //check if password is valide then generet toke
    } catch (error) {
      throw new Error(`Unable to login : ${(error as Error).message}`);
    }
  }
}

export default new UserModel();
