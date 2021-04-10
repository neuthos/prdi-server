const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY);

    req.dataUser = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
