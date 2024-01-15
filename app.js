const express = require("express"),
  port = 3000,
  app = express();

// Middleware function to log timestamp and requested endpoint
const requestLoggerMiddleware = (req, res, next) => {
  // Log timestamp and requested endpoint
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // Continue to the next middleware or route handler
  next();
};

// Use the middleware for all incoming requests
app.use(requestLoggerMiddleware);

app.use("/api/health", (req, res, next) => {
  res.json({ message: "Server is healthy" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
