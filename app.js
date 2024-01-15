const express = require("express");

const port = 3000;

const app = express();

app.use("/api/health", (req, res, next) => {
  res.json({ message: "Server is healthy" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
