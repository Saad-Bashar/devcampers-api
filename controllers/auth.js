const ErorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

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
