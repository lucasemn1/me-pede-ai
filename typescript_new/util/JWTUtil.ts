import * as jwt from 'jsonwebtoken';
import UserRepository from '../app/repository/UserRepository';
import JWTObject from '../interfaces/JWTObject';
import { User } from '../app/models/User';

class JWTUtil {
  static expireTime = 60*60*24;
    
  static createToken(id: number): string {
    const token = jwt.sign({ id }, process.env.PRIVATE_KEY, { algorithm: 'HS512', expiresIn: this.expireTime });

    return token;
  }
  
  static isTokenValid(token: string): boolean{
    let result: boolean;

    jwt.verify(token, process.env.PRIVATE_KEY, { algorithms: ['HS512'] }, (err) => {
      if (err) {
        result = false;
      }
      else {
        result = true;
      }
    });

    return result;
  }

  static async getUser(token: string): Promise<User> {
    try { 
      const { id } = jwt.verify(token, process.env.PRIVATE_KEY) as JWTObject;
      return await UserRepository.getUserById(id);
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }
}

export default JWTUtil;