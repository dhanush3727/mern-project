import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  console.log(req);
  return res.status(233).send("Hello World");
});

// Connect mongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    // Run the server
    app.listen(PORT, () => {
      console.log(`App is running in port : ${PORT}`);
    });
    
  })
  .catch((err) => {
    console.log(err);
  });
