import { Router } from "express";
import { UserRoutes } from "./user.routes";

const routes = Router();

routes.use("/users", new UserRoutes().routes());

export { routes };
