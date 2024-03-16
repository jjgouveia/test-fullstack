import "dotenv/config";
import * as express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { UserRoutes } from "./routes/user.routes";

class App {
  public app: express.Application;
  private port: string;

  constructor() {
    this.app = express.default();
    this.port = process.env.PORT || "3000";

    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    const userRoutes = new UserRoutes().routes();

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(helmet());
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000 /* 15 minutos */,
        max: 100 /* 100 requisições */,
      })
    );
    this.app.use("/users", userRoutes);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Iniciando o servidor na porta ${this.port}`);
    });
  }
}

export default App;
