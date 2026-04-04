export type ErrorType = 
  | "VALIDATION" 
  | "UNAUTHORIZED" 
  | "FORBIDDEN" 
  | "NOT_FOUND" 
  | "SERVER_ERROR" 
  | "NETWORK_ERROR" 
  | "RATE_LIMIT";

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public type: ErrorType,
    public fieldErrors?: Record<string, string[]>, 
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}