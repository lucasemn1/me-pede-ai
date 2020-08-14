import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export class UserController {
  static async store(request: Request, response: Response): Promise<Response> {
    return response.json(request.body);
  }
}