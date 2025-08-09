import { verify } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const apiKey = req?.headers["x-api-key"] ?? req?.query?.apiKey;
    if (apiKey == process.env.MASTERS_API_KEY) next();
    else {
      const authToken = req?.headers["authorization"];
      if (!authToken) throw { mesaage: "no token found", status: 401 };
      const token = authToken.split(" ")[1];
      const decoded = verify(token);
      req.user = decoded;
      next();
    }
  } catch (err) {
    throw { status: 401, message: "token validation failed" };
  }
};
