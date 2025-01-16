//Use Express Router for cleaner and modular route management
import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Route for create a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields : title, author, publish year",
      });
    }
    const newBook = {
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

// Route for get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// Route for get a book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: err.message });
  }
});

// Route for update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields : title, author, publish year",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({
        msg: "Book not found",
      });
    }

    return res.status(200).send({ msg: "Book Updated Successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: err.message });
  }
});

// Route for delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({
        msg: "Book not found",
      });
    }

    return res.status(200).send({ msg: "Book Deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: err.message });
  }
});

export default router;
