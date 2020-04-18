import statusesRes from '../enums/response';
//Factory pattern
class Response {

  constructor(data) {
    this.status = null;
    this.data = data;
  }

  send() {
    const { status, data } = this;
    const payload = {
      success: this.status < 400
    };
    if (payload.success) {
      payload.data = data;
    } else {
      payload.message = data;
    }
    return { status, payload };
  }
}

class ResponseFactory extends Response {
  constructor(type, data) {
    super(data);
    const statusRes = statusesRes[type];
    if (statusRes) {
      this.status = statusRes[0];
      if (statusRes[1]) {
        this.data = statusRes[1]
      }
      return this.send()
    }
  }
}



module.exports = ResponseFactory