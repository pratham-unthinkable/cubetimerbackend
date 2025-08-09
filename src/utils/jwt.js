import jwt from "jsonwebtoken";
const { JWT_SECRET = "secret-key" } = process.env;

export const sign = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const verify = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
