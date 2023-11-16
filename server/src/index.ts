import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { WebSocketServer } from "./WebSocketServer";
import * as path from "path";


const port = 8001;
export const webSocketServerInstance = new WebSocketServer(port);


AppDataSource.initialize()
  .then(async () => {
    const dotenv = require("dotenv");
    dotenv.config();

    // create express app

    const app = express();
    const port = process.env.PORT;

    // Call midlewares
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use((err: any, req: Request, res: Response, next: Function) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    // register express routes from defined application routes
    Routes.forEach((route) => {
      const middlewares = route.middlewares || []; // Assign an empty array if middlewares are not provided
      (app as any)[route.method](
        route.route,
        ...middlewares,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, "../client/build")));

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    // start express server
    app.listen(port);

    console.log(`Express server has started on port ${port}.`);
  })
  .catch((error) => console.log(error));
