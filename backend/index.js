import express from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();
const PORT = 5000;

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(233).send("Hello World");
});

// Route for create a book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields : title, author, publish year",
      });
    }

    const id = Date.now();

    const newBook = {
      _id: id,
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
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
    console.log("Error : ", err);
  });
