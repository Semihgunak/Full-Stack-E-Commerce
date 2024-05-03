const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");


// Product Create
router.post("/", async (req, res) => {
  try {
    const product = req.body;

    const newProduct = new Product(product);
    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
  }
});


// tüm ürünleri getirme
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// belirli bir ürünü getirme

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    try {
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ürün güncelleme (update)

router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


// kategori silme (delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    try {
      const products = await Product.find({
        name: {$regex: productName, $options: "i"}
      })

      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router