import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class ValidateRequestMiddleware {
  public static valide(request: Request, response: Response, next: NextFunction): Response | void {
    const erros = validationResult(request);

    if(erros.isEmpty()) {
      return next();
    }

    return response.status(400).json({ errors: erros.array() });
  }
}