import { body, header } from 'express-validator';

export default class UserValidations {
  public static store = [
    body('name').isString().isLength({ max: 255, min: 2 }),
    body('email').isEmail().isLength({ min: 5, max: 255 }),
    body('bornDate').isDate(),
    body('password').isString().isLength({ min: 3, max: 255 }),
  ]

  public static delete = [
    header('authorization').isString().notEmpty()
  ]

  public static get = [
    header('authorization').isString().notEmpty()
  ]
}