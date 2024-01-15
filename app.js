const express = require("express"),
  mongoose = require("mongoose"),
  port = 3000,
  app = express(),
  userRoutes = require("./routes");

// uri to local instance
const uri = "mongodb://localhost:27017/healthDB";

// connect using Mongoose ORM
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
  });
// Middleware function to log timestamp and requested endpoint
const requestLoggerMiddleware = (req, res, next) => {
  // Log timestamp and requested endpoint
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // Continue to the next middleware or route handler
  next();
};

// Use the middleware for all incoming requests
app.use(express.json());

app.use("/api/health", (req, res, next) => {
  res.json({ message: "Server is healthy" });
});

app.use("/", userRoutes);

// error middleware
app.use((err, req, res, next) => {
  const message = err.message;
  const status = err.statusCode || 500;

  return res.status(status).json({ message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
