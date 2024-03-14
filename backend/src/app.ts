import "dotenv/config";
import * as express from "express";

class App {
  public app: express.Application;
  private port: string;

  constructor() {
    this.app = express.default();
    this.port = process.env.PORT || "3000";

    this.config();

    this.app.get("/oi", (req, res) => {
      res.status(418).json({ message: "Como vai você?" });
    });
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

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Iniciando o servidor na porta ${this.port}`);
    });
  }
}

export default App;
