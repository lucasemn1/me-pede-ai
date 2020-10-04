import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class ValidateRequestMiddleware {
  public static validate(req: Request, res: Response, next: NextFunction) {
    const erros = validationResult(req);

    if(erros.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: erros.array() });
  }
}