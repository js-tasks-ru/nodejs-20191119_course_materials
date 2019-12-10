const providers = {
  github: require('./github')
};

module.exports = function getProvider(name) {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Provider ${name} not implemented`)
  }
  return provider;
};
