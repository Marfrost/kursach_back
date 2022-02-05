class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string): ApiError {
    console.log(`API Error: 400 - ${message}`)
    return new ApiError(400, message);
  }
  static notImplemented(): ApiError {
    console.log(`API Error: 501}`)
    return new ApiError(501, "not implemented");
  }
  static forbidden(message: string): ApiError {
    console.log(`API Error: 403 - ${message}`)
    return new ApiError(403, message);
  }
  static unauthorized(message: string): ApiError {
    console.log(`API Error: 401 - ${message}`)
    return new ApiError(401, message);
  }

  static internal(message: string): ApiError {
    console.log(`API Error: 503 - ${message}`)
    return new ApiError(500, message);
  }
  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }
}

export { ApiError };
