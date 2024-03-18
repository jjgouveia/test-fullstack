import "dotenv/config";
import * as express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { routes } from "./routes/routes";

class App {
  public app: express.Application;
  private port: string;

  constructor() {
    this.app = express.default();
    this.port = process.env.PORT || "2358";

    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    const MAX_REQUESTS = 100;

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(helmet());
    this.app.use(
      rateLimit({
        windowMs: FIFTEEN_MINUTES,
        max: MAX_REQUESTS,
      })
    );
    this.app.use("/api/v1", routes);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Iniciando o servidor na porta ${this.port}`);
    });
  }
}

export default App;
