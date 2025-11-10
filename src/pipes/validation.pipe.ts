import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function ValidationPipe(dtoClass: any, source: "body" | "query" | "params" = "body") {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input = req[source];
    const dtoObject = plainToInstance(dtoClass, input);

    const errors = await validate(dtoObject, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      const messages = errors.map(
        (err) => `${err.property}: ${Object.values(err.constraints || {}).join(", ")}`
      );

      return res.status(400).json({
        statusCode: 400,
        message: "Validation failed",
        errors: messages,
      });
    }

    // Ghi đè lại req[source] bằng object đã transform
    req[source] = dtoObject;
    next();
  };
}
