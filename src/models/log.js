import mongoose from "mongoose";
import { puzzleTypes } from "../constants/puzzleTypes.js";

const logSchema = new mongoose.Schema(
  {
    time: {
      type: Number, // store in milliseconds for precision
      required: true,
    },
    puzzleType: {
      type: String,
      enum: Object.values(puzzleTypes),
      required: true,
    },
    scramble: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", logSchema);
