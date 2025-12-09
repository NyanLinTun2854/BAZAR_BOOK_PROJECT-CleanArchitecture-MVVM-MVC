// src/types/errors.ts

/**
 * Standard error for validation failures (e.g., 422 Unprocessable Entity).
 * The 'data' field holds the field-specific errors returned by the API.
 */
export class ValidationError extends Error {
  name = 'ValidationError';
  status: number;
  // Map of fields to error messages (e.g., { email: "is required" })
  errors: Record<string, string>;

  constructor(message: string, status: number, errors: Record<string, string>) {
    super(message);
    this.status = status;
    this.errors = errors;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
