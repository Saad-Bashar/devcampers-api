const Bootcamp = require("../models/Bootcamp");
const ErorResponse = require("../utils/ErrorResponse");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find(req.query);
    res
      .status(200)
      .json({ success: true, data: bootcamps, count: bootcamps.length });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
    // return res.status(400).json({ success: false });
  }
};

// @desc Get single bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getUserBootcamp = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bootcamp = await Bootcamp.find({ user: userId });

    if (!bootcamp) {
      return next(
        new ErorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
    // return res.status(400).json({ success: false });
  }
};

// @desc Create new bootcamp d
// @route POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = async (req, res, next) => {
  try {
    // add user to req.body
    req.body.user = req.user.id;
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// @desc Update single bootcamps
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
    // return res.status(400).json({ success: false });
  }
};

// @desc Delete single bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
    // return res.status(400).json({ success: false });
  }
};
