var jwt = require("jsonwebtoken");

function signToken(payload) {
  let token = jwt.sign(payload, process.env.SECRET_KEY);

  return token;
}

module.exports = signToken;
