// Create a model
import mongoose from "mongoose";

// Create a Schema
const bookSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
