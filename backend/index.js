import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS
// There two option to allow cors
app.use(cors()); // It allow all origin

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(233).send("Hello World");
});
// Middleware for handling route
app.use("/books", booksRoute);

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
    console.log("Error : ", err);
  });
