const bcrypt = require('bcryptjs');

module.exports.generateSalt = async (value) => {
  const salt = await bcrypt.genSalt(value);
  return salt;
};

module.exports.encrypt = async (value, salt) => {
  const result = await bcrypt.hash(value, salt);
  return result;
};
