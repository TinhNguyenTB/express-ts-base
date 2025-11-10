import { Request, Response, NextFunction } from "express";
import { responseInterceptor } from "@/interceptors/response.interceptor";

export const responseTransformInterceptor = (req: Request, res: Response, next: NextFunction) => {
  // Giữ lại hàm gốc
  const originalJson = res.json.bind(res);

  // Ghi đè lại res.json
  res.json = (body: any) => {
    // Nếu body đã có statusCode (do ExceptionFilter gửi), không format lại
    if (body && typeof body === "object" && "statusCode" in body) {
      return originalJson(body);
    }

    const formatted = responseInterceptor(body, res.locals.message || "Success");

    return originalJson(formatted);
  };

  next();
};
