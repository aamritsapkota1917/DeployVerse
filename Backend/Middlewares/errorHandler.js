import { error_logger } from "../Utils/logger.js";

const errorHandler = (err, req, res, next) => {
  res.status(500);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  log_error(req, res, err.message, statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
export default errorHandler;

const log_error = (req, res, message, status) => {
  const start = Date.now();

  res.on("finish", () => {
    const { method, originalUrl } = req;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const duration = Date.now() - start;

    error_logger.error(
      `${ip} - - [${new Date().toISOString()}] "${method} ${originalUrl}" ${status} - "${userAgent}" ${duration}ms - ${message}`
    );
  });
};