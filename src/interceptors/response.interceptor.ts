export interface ResponseFormat<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export const responseInterceptor = <T>(
  data: T,
  message = "Success",
  statusCode = 200
): ResponseFormat<T> => {
  return {
    statusCode,
    message,
    data,
  };
};
