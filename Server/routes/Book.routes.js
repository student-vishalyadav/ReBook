const express = require("express");
const {
  createbook,
  getAllBooks,
  updateBook,
  DeleteBook,
} = require("../controller/Book.controller");
const auth = require("../middleware/Auth.middleware");
const upload = require("../middleware/Multer");
const router = express.Router();

router.post("/", auth, upload.array("images", 5), createbook);
router.get("/", getAllBooks);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, DeleteBook);

module.exports = router;
