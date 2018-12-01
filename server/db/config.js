try {
  Object.assign(process.env, require('./env2'));
} catch (ex) {}

module.exports = process.env;
