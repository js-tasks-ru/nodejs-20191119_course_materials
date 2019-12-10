class AccessDenied extends Error {
  constructor() {
    super('Access Denied');
    this.status = 403;
    this.expose = true;
  }
}

module.exports = AccessDenied;
