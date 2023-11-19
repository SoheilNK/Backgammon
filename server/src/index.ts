import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { WebSocketServer } from "./WebSocketServer";
import * as path from "path";
import * as logger from "./logger";


export const webSocketServerInstance = new WebSocketServer();


AppDataSource.initialize()
  .then(async () => {
    const dotenv = require("dotenv");
    dotenv.config();

    // create express app

    const app = express();
    const port = process.env.PORT;

    // Call midlewares
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            connectSrc: [
              "'self'",
              "https://sosepbackgammon.auth.ca-central-1.amazoncognito.com",
              "ws://localhost:8001",
            ],
            // Add other directives as needed
          },
        },
      })
    );

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
    const static_dir = path.resolve(path.join(__dirname, '../../client/dist'))

    app.use(express.json())
    app.use('/', express.static(static_dir))

    app.get('/*', (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        next();
        return;
      }
      console.log("sending index.html");
      res.sendFile(path.join(static_dir, 'index.html'));
    });

    app.post('/api/echo', (req, res) => {
      console.log(req);
      res.json(req.body);
    })

    app.listen(port, () => {
      logger.get().info(`port ${port}, im listening...`)
    })
  })
  .catch((error) => console.log(error));
