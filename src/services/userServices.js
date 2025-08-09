import { hash, compare } from "bcrypt";
import { User } from "../models/user.js";
import { sign } from "../utils/jwt.js";
import { Log } from "../models/log.js";
import { paginate } from "../utils/paginate.js";

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: "user not found" };
  const valid = await compare(password, user.password);
  if (!valid) throw { status: 400, message: "password incorrect" };
  const tokenPayload = {
    _id: user._id,
    name: user.name,
    username,
  };
  const token = sign(tokenPayload);
  return {
    token,
    user: tokenPayload,
  };
};

const register = async ({ username, password, name }) => {
  const hashPass = await hash(password, 5);
  const user = new User({
    username,
    password: hashPass,
    name,
  });
  const res = await user.save();
  const tokenPayload = { username, name, _id: res._id };
  const token = sign(tokenPayload);
  return {
    token,
    user: tokenPayload,
  };
};

const addLogs = async (logs) => {
  await Log.insertMany(logs);
  return {
    message: "logs added successfull",
  };
};

const getLogs = async (filter = {}, { page, limit, select }) => {
  return paginate(Log, filter, {
    page,
    limit,
    projection: select,
  });
};

const deleteLogs = async (logs = []) => {
  const ids = logs.map((log) => log._id);
  const res = await Log.deleteMany({
    _id: {
      $in: ids,
    },
  });
  return res;
};

export default {
  login,
  register,
  addLogs,
  getLogs,
  deleteLogs,
};
