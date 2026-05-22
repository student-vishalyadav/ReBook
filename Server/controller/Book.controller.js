const Book = require("../models/Book.schema");
const createbook = async (req, res) => {

  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      title,
      category,
      examType,
      subject,
      originalPrice,
      sellingPrice,
      condition,
      description,
      location,
    } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];

    if (
      !title ||
      !category ||
      !subject ||
      !originalPrice ||
      !sellingPrice ||
      !description ||
      !location ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including at least one image",
      });
    }

    const book = await Book.create({
      title,
      category,
      examType,
      subject,
      originalPrice,
      sellingPrice,
      condition,
      description,
      location,
      images,

      seller: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      book,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getAllBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate("seller", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalBooks = await Book.countDocuments();

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const {
      title,
      category,
      examType,
      subject,
      originalPrice,
      sellingPrice,
      condition,
      description,
      location,
    } = req.body;

    if (
      !title ||
      !category ||
      !subject ||
      !originalPrice ||
      !sellingPrice ||
      !condition ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const { id } = req.params;
    let updatedBooks = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).send("Books info is updated Now .. ");
  } catch (error) {
    res.status(500).send("Server Error" + error);
  }
};



const DeleteBook = async (req, res) => {
  2;
  try {
    const { id } = req.params;
    const Delete = await Book.findByIdAndDelete(id, req.body);

    res.status(200).send("This Book is Deleted Now !" + Delete);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { getAllBooks, createbook  , updateBook , DeleteBook};
