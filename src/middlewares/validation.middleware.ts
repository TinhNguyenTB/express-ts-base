import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "@/exceptions/http-exception";

interface RouteValidation {
  body?: any;
  query?: any;
  params?: any;
}

export const globalValidationMiddleware =
  (schemas: RouteValidation = {}) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      for (const [key, Dto] of Object.entries(schemas)) {
        if (!Dto) continue;

        const dtoObject = plainToInstance(Dto, req[key as keyof Request]);
        const errors = await validate(dtoObject, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
          const messages = errors.map(
            (err) => `${err.property}: ${Object.values(err.constraints || {}).join(", ")}`
          );

          throw new HttpException(400, "Validation failed", messages);
        }

        (req as any)[key] = dtoObject;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
