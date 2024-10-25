export interface IError {
  error: string;
}

export class CustomError extends Error {
  errors: { error: string | IError[] }; 

  constructor(errorDetails: { error: string | IError[] }) {
    super(Array.isArray(errorDetails.error) ? 'An error occurred' : errorDetails.error);
    this.errors = errorDetails; 
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
