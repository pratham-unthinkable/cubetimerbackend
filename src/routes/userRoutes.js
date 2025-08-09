import userController from "../controllers/userController.js";
export const userRoutes = {
  name: "user",
  routes: [
    {
      public: true,
      name: "auth/login",
      method: "POST",
      callback: userController.login,
    },
    {
      public: true,
      name: "auth/register",
      method: "POST",
      callback: userController.register,
    },
    {
      name: "logs",
      method: "POST",
      callback: userController.addLogs,
    },
    {
      name: "logs",
      method: "GET",
      callback: userController.getLogs,
    },
    {
      name: "logs",
      method: "DELETE",
      callback: userController.deleteLogs,
    },
    {
      name: "logs",
      method: "DELETE",
      callback: userController.deleteLogs,
    },
    {
      name: "stats",
      method: "GET",
      callback: userController.getStats,
    },
  ],
};
