const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog.js");


// Blog Create
router.post("/", async (req, res) => {
  try {
    const blog = req.body;

    const newBlog = new Blog(blog);
    await newBlog.save();

    res.status(201).send(newBlog);
  } catch (error) {
    console.log(error);
  }
});


// tüm ürünleri getirme
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// belirli bir ürünü getirme

router.get("/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;

    try {
      const blog = await Blog.findById(blogId);
      res.status(200).json(blog);
    } catch (error) {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ürün güncelleme (update)

router.put("/:BlogId", async (req, res) => {
  try {
    const BlogId = req.params.BlogId;
    const updates = req.body;

    const existingBlog = await Blog.findById(BlogId);

    if (!existingBlog) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      BlogId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


// kategori silme (delete)
router.delete("/:BlogId", async (req, res) => {
  try {
    const BlogId = req.params.BlogId;

    const deletedBlog = await Blog.findByIdAndDelete(BlogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.status(200).json(deletedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});



module.exports = router