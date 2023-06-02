// Create a Flask server that serves the endpoint / on port {env.PORT} with a response of "Hello {env.WORD}"
import express from "express";
import http from "node:http";

// if process.env.WORD is unset, set it to "World"
process.env.WORD = process.env.WORD || "World";

// if process.env.PORT is unset, set it to 3000
process.env.PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const stopServer = () => {
  server.close();
  process.exit();
};

// enable graceful shutdown on SIGTERM or SIGINT
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  stopServer();
  ;
});
process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  stopServer();
});

app.get("/", (req, res) => {
  res.send(`Hello ${process.env.WORD}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

