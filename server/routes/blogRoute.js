const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/blogs", blogController.createBlog);
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlog);
router.put("/blogs/:id", blogController.updateBlog);
router.delete("/blogs/:id", blogController.deleteBlog);

module.exports = router;
