const createError = require("http-errors");
const User = require("../models/user.model");

const formatUser = (user) => ({
  id: user._id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  created: user.created,
  updated: user.updated
});

exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: formatUser(user)
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "Users list retrieved successfully.",
      data: users.map(formatUser)
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: formatUser(user)
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    req.body.updated = Date.now();

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully."
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

