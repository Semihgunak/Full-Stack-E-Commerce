const mongoose = require("mongoose");

const SliderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", SliderSchema);

module.exports = Slider;
