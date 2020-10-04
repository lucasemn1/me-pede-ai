import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';

export class UserController {
  static async store(request: Request, response: Response): Promise<Response> {
    const connection = await createConnection();

    try {
      const data = request.body;
      let user = new User();
      user.name = data.name;
      user.email = data.email;
      user.password = data.password;
      user.dateOfBirth = data.dateOfBirth;
      
      user = await connection.manager.save(user);

      await connection.close();
      return response.status(201).json(user);
    }
    catch(err) {
      await connection.close();
      return response.status(500).json({ error: err });
    }
  }
}