import userServices from "../services/userServices.js";

const register = async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    throw { status: 404, message: "name username and password required" };
  }
  return userServices.register({ username, name, password });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw { status: 404, message: "username and password required" };
  }
  return userServices.login({ username, password });
};

const addLogs = async (req, res) => {
  const { logs } = req.body;
  if (!logs) {
    throw { status: 404, message: "no logs found" };
  }
  return userServices.syncLogs(
    logs.map((log) => ({ ...log, user: req.user._id }))
  );
};

const getLogs = async (req, res) => {
  const { user } = req;
  const { page, limit } = req.query;
  if (!user) throw { message: "user not found", status: 404 };
  return userServices.getLogs({ user: user._id }, { page, limit });
};

const deleteLogs = async (req, res) => {
  const { logs } = req.body;
  if (!logs) throw { message: "logs not found", status: 404 };
  return userServices.deleteLogs(logs);
};

export default {
  register,
  login,
  addLogs,
  getLogs,
  deleteLogs
};
