export class CustomResponse {
    statusCode: number;
    message: string;
    data?: any;
  
    constructor(statusCode: number, message: string, data?: any) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }

    
  }
  
  export class CustomError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      //console.log(statusCode);
      
      this.statusCode = statusCode;
    
      //console.log(statusCode);
    }
  }