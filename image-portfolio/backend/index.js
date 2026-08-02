import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Photo Gallery API");
});

app.listen(3000, () => {
  console.log("Server running on Port 3000");
});