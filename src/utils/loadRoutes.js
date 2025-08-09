import { routes } from "../routes/index.js";
import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const loadRoutes = () => {
  const router = Router();
  routes.forEach((route) => {
    const { routes: moduleRoutes, name } = route;

    let baseUrl = name ? `/${name}` : ``;

    moduleRoutes.forEach((data) => registerRoutes(router, data, baseUrl));
  });
  return router;
};

const registerRoutes = (router, moduleRoute, baseUrl) => {
  const {
    name,
    method,
    callback,
    middlewares = [],
    public: isPublic,
  } = moduleRoute;
  const url = `${baseUrl}/${name}`;
  router[method.toLowerCase()](url, [
    ...(isPublic ? [] : [authMiddleware]),
    ...middlewares.map(asyncHandler),
    asyncHandler(callback),
  ]);
};
