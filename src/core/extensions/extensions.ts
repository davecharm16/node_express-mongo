export class CustomError extends Error {
  errorDetails: { error: string };  // Custom object to hold error details

  constructor(errorDetails: { error: string }) {
    super(errorDetails.error);  // Pass the error message to the parent Error constructor
    this.errorDetails = errorDetails;  // Store the error object
    Object.setPrototypeOf(this, CustomError.prototype);  // Fix the prototype chain
  }
}

// Example usage:
throw new CustomError({ error: 'Invalid Email Address' });
