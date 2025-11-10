import { Request, Response, NextFunction } from "express";
import { HttpException } from "@/exceptions/http-exception";

export const exceptionFilter = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err);

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || null,
    });
  }

  // Fallback cho lỗi không xác định
  return res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
  });
};
