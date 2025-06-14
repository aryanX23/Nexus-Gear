const { ENCRYPT_KEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env || {};
const Cryptr = require("cryptr");
const cryptr = new Cryptr(ENCRYPT_KEY);

const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");

const { User } = require("../models");
const { errorHandler } = require("../utils/errorHandler");
const { getId } = require("../utils/generateId");

async function addUser(req, res) {
  try {
    const { name = "", email = "", password = "" } = req.body || {};

    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
      throw {
        code: "MISSING_ARGUMENTS",
        message: "Name, Email or Password is Missing",
      };
    }

    const exists = (await User.findOne({ email }).lean()) || {};
    if (!isEmpty(exists)) {
      throw {
        code: "INVALID_ARGUMENTS",
        message: "User Already Exists with this Email ID",
      };
    }

    const userId = getId("USER");
    const hashedPassword = cryptr.encrypt(password);
    await User.create({
      userId,
      email,
      password: hashedPassword,
      name,
      cartItems: [],
      previousOrders: [],
      role: "user",
    });

    return res
      .status(200)
      .send({ status: "success", response: "User Registered Successfully!" });
  } catch (error) {
    errorHandler(req, res, error);
  }
}

async function handleLogin(req, res) {
  try {
    const { email = "", password = "" } = req.body;

    if (isEmpty(email) || isEmpty(password)) {
      throw {
        code: "MISSING_ARGUMENTS",
        message: "Email or Password is Missing",
      };
    }

    const userDetails = (await User.findOne({ email }).lean()) || {};

    if (isEmpty(userDetails)) {
      throw {
        code: "INVALID_ARGUMENTS",
        message: "User does not exists!",
      };
    }

    const { password: userPassword, userId } = userDetails;

    const hashedPassword = cryptr.decrypt(userPassword);

    if (hashedPassword !== password) {
      throw {
        code: "UNAUTHORIZED_USER",
        message: "Incorrect Password",
      };
    }

    const payload = {
      userId,
      email,
    };
    const ACCESS_SECRET_KEY = ACCESS_TOKEN_SECRET;
    const REFRESH_SECRET_KEY = REFRESH_TOKEN_SECRET;

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY);

    return res.status(200).send({
      ACCESS_TOKEN: accessToken,
      REFRESH_TOKEN: refreshToken,
      userId,
      status: "success",
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
}

module.exports = {
  addUser,
  handleLogin,
};
