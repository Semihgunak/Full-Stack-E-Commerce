const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

// Category Create
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// tüm kategorileri getirme
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// belirli bir kategoriyi getirme

router.get("/:categorId", async (req, res) => {
  try {
    const categorId = req.params.categorId;

    try {
      const category = await Category.findById(categorId);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// kategoriyi güncelleme (update)
router.put("/:categorId", async (req, res) => {
  try {
    const categorId = req.params.categorId;
    const updates = req.body;

    const existingCategory = await Category.findById(categorId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categorId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// kategori silme (delete)
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
