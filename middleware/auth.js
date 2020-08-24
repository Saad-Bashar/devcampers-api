const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse("Not authorize to use this route", 401));
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      return next(new ErrorResponse("Not authorize to use this route", 401));
    }
  } catch (error) {
    return next(new ErrorResponse("Not authorize to use this route", 401));
  }
};
