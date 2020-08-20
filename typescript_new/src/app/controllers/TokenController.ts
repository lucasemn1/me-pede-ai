import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { hashPassword } from "../util/util";
import * as bcrypt from 'bcrypt';

interface IFCredentials {
  email: string,
  password: string
}

export class TokenController {
  static async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as IFCredentials; 
    const connection = await createConnection();

    try {
      const user = await connection.getRepository(User)
        .createQueryBuilder()
        .where('email LIKE :email', { email })
        .getOne();

      await connection.close();

      if(!bcrypt.compareSync(password, user.password)) {
        return response.status(401).json({ error: 'The credentials entered are invalid.' })
      }
      
      return response.status(200).json(user);
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return response.status(500).json({ error: err });
    }
  }
}