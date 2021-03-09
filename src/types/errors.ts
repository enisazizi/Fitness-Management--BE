export class errorMessage {
    msg: string;
    httpStatus: number;
    constructor(msg: string, httpStatus: number) {
      this.msg = msg;
      this.httpStatus = httpStatus;
    }
  }