import { body } from 'express-validator';

export class TokenValidations {
  public static store = [
    body('email').isEmail().isLength({ max: 255, min: 2 }),
    body('password').isString().isLength({ min: 3, max: 255 }),
  ]
}