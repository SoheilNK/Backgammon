import * as winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export const get = (): winston.Logger => {
  return logger;
};
