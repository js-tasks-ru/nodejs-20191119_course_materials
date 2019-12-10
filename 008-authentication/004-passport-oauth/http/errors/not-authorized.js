class NotAuthorized extends Error {
  constructor() {
    super();
    this.status = 401;
  }
}

module.exports = NotAuthorized;
