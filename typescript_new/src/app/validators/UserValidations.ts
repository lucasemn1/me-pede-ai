import { body, validationResult } from 'express-validator';
import { Request, NextFunction, Response, response } from 'express';

export class UserValidations {
  public static store = [
    body('name').isString().isLength({ max: 255, min: 2 }),
    body('email').isEmail().isLength({ min: 5, max: 255 }),
    body('dateOfBirth').isDate(),
    body('password').isString().isLength({ min: 3, max: 255 }),
  ]
}