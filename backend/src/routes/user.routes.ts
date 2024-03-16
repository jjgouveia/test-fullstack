import { Router } from "express";
import { UserController } from "../controllers/user.controller";

class UserRoutes {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
  }

  public routes(): Router {
    this.router.post("/", this.userController.store.bind(this.userController));
    this.router.get("/", this.userController.index.bind(this.userController));
    this.router.patch(
      "/:id",
      this.userController.update.bind(this.userController)
    );

    return this.router;
  }
}

export { UserRoutes };
