import winston from "winston";

const consoleFormat = winston.format.combine(winston.format.colorize(), winston.format.simple());

export const info_logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

export const error_logger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});