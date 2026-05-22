const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "College",
        "SSC",
        "JEE",
        "NEET",
        "UPSC",
        "Banking",
        "Railway",
      ],
    },

    examType: {
      type: String,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    condition: {
      type: String,
      enum: ["New", "Good", "Old"],
      default: "Good",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isSold: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);