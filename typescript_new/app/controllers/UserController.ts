import { User } from '../models/User';
import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';
import JWTUtil from '../../util/JWTUtil';

class UserController {
  static async store(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      bornDate,
      password,
    }: { name: string; email: string; bornDate: string, password: string } = req.body;

    const userToSave = new User();
    userToSave.name = name;
    userToSave.email = email;
    userToSave.bornDate = bornDate;
    userToSave.password = password;

    const result = await UserRepository.create(userToSave);

    if (typeof result === 'boolean') {
      return res.status(201).json();
    }

    return res.status(500).json({ err: result });
  }

  static async get(req: Request, res: Response): Promise<Response> {
    const token: string = req.headers.authorization;

    const user = await JWTUtil.getUser(token);

    if (user) {
      return res.status(200).json({ user });
    }

    return res.status(404).json({ err: 'User was not found.' });
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const token: string = req.headers.authorization;

    const user = await JWTUtil.getUser(token);

    if (user) {
      const result = await UserRepository.deleteUserById(user.id);

      if (result) {
        return res.status(200).json();
      }

      return res.status(500).json();
    }

    return res.status(404).json({ err: 'User was not found.' });
  }
}

export default UserController;
