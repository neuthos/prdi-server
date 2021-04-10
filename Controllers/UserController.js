const User = require("../Models/User");
const { hashPassword, checkPassword } = require("../helper/bcrypt");
const signToken = require("../helper/jwt");
mongooseErrorHandler = require("mongoose-error-handler");

class UserController {
  static async register(req, res) {
    try {
      let { username, email, password } = req.body;

      if (password === "") throw { errors: "Password cannot be empty" };

      const newPass = hashPassword(password);
      const newUser = new User({
        username,
        email,
        password: newPass,
        posts: [],
      });

      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      let message = [];

      if (err.errors.username) {
        message.push(err.errors.username.message);
      }
      if (err.errors.email) {
        message.push(err.errors.email.message);
      } else if (err.errors) {
        message.push(err.errors);
      }

      res.status(400).json({ error: message });
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      const user = await User.findOne({ email }).populate("posts");

      if (!user) {
        throw { errors: "Invalid email or password" };
      } else {
        const comparePassword = checkPassword(password, user.password);

        if (!comparePassword) {
          throw { errors: "Invalid email or password" };
        } else {
          let payload = {
            _id: user._id,
            username: user.username,
          };

          const token = signToken(payload);

          res.status(200).json({ access_token: token, user });
        }
      }
    } catch (err) {
      let message = [];

      if (err.errors.username) {
        message.push(err.errors.username.message);
      }
      if (err.errors.email) {
        message.push(err.errors.email.message);
      } else if (err.errors) {
        message.push(err.errors);
      }

      res.status(400).json({ error: message });
    }
  }
}

module.exports = UserController;
