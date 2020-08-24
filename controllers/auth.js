const ErorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate email and
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    // check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};
