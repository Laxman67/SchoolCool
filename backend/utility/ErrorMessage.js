class responseMessage {
  constructor(code, status, msg) {
    this.code = code;
    this.message = msg;
    this.status = status;
  }
}

export default responseMessage;
