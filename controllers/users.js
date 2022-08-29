const { User } = require("../models/index");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateJWT");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

const getUsers = asyncHandler(async (req, res) => {
  console.log(req.user);
  const users = await User.find({}).select("-__v -password");

  res.status(200).json(users);
});

// POST /api/user/register
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const { valid, errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );

  if (!valid) {
    console.log(errors);
    throw new Error({ errors });
  }

  const foundUsername = await User.findOne({ username });
  const foundUserEmail = await User.findOne({ email });

  if (foundUsername) {
    throw new Error({ username: "Username taken" });
  }

  if (foundUserEmail) {
    throw new Error({ email: "This email is taken" });
  }

  const user = await User.create({ username, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    res.status(404);
    throw new Error("User Not Found");
  }

  // Check to berify supplied password matches hashed password in DB
  const correctPassword = await foundUser.isCorrectPassword(password); //isCorrectPassword - method on userSchema to check password
  if (!correctPassword) {
    res.status(400);
    throw new Error("Incorrect credentials");
  }

  res.status(201).json({
    _id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    token: generateToken(foundUser),
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const foundUser = await User.findOneAndDelete({ _id: id });

  if (foundUser) {
    res.status(201).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  deleteUser
};
