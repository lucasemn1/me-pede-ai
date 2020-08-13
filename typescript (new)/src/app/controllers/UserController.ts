import { Request, Response } from 'express';

export class UserController {
  static async store(request: Request, response: Response): Promise<Response> {
    return response.send('Oioioi');
  }
}