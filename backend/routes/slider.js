const express = require("express");
const router = express.Router();
const Slider = require("../models/Slider.js");

// Slider Create
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newSlider = new Slider({ name, img });
    await newSlider.save();

    res.status(201).send(newSlider);
  } catch (error) {
    console.log(error);
  }
});

// tüm kategorileri getirme
router.get("/", async (req, res) => {
  try {
    const sliders = await Slider.find();

    res.status(200).json(sliders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;

    try {
      const slider = await Slider.findById(sliderId);
      res.status(200).json(slider);
    } catch (error) {
      res.status(404).json({ error: "Slider not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


// kategoriyi güncelleme (update)
router.put("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;
    const updates = req.body;

    const existingSlider = await Slider.findById(sliderId);

    if (!existingSlider) {
      return res.status(404).json({ error: "Slider not found" });
    }

    const updatedSlider = await Slider.findByIdAndUpdate(
      sliderId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// kategori silme (delete)
router.delete("/:SliderId", async (req, res) => {
  try {
    const SliderId = req.params.SliderId;

    const deletedSlider = await Slider.findByIdAndDelete(SliderId);

    if (!deletedSlider) {
      return res.status(404).json({ error: "Slider not found." });
    }

    res.status(200).json(deletedSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
