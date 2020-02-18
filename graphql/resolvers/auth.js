const assert = require("assert");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { transformUser } = require("./common.js");

exports.createUser = async args => {
  console.log(`auth.createUser(${args})`);
  console.log(args);
  const { email, password } = args;
  console.log(`auth.createUser(${email},${password})`);
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error(`User [${email}] already exists.`);
    }
    const hashedpw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedpw
    });
    const savedUser = await user.save();
    return transformUser(savedUser);
  } catch (err) {
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    assert(user, `User [${email}] does not exist!`);
    const isEqual = await bcrypt.compare(password, user.password);
    assert(isEqual, "Password is incorrect");
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  } catch (err) {
    throw err;
  }
};
