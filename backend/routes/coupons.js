const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

router.post("/", async (req, res) => {
  try {
    const {code} = req.body;

    const existingCoupon = await Coupon.findOne({code})

    if (existingCoupon) {
        return res.status(400).json({error:"Coupon is already exists "})
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).send(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


// tüm couponları getirme
router.get("/", async (req, res) => {
    try {
      const coupons = await Coupon.find();
  
      res.status(200).json(coupons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // belirli bir couponu getirme
  
  router.get("/:couponId", async (req, res) => {
    try {
      const couponId = req.params.couponId;
  
      try {
        const coupon = await Coupon.findById(couponId);
        res.status(200).json(coupon);
      } catch (error) {
        res.status(404).json({ error: "Coupon not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  });



  router.get("/code/:couponCode", async (req, res) => {
    try {
      const couponCode = req.params.couponCode;

      const coupon = await Coupon.findOne({code: couponCode});
      if (!coupon) {
        res.status(404).json({ error: "Coupon not found" });
      }
      const{discountPercent} = coupon
      res.status(200).json({discountPercent});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  
// coupon güncelleme (update)
router.put("/:couponId", async (req, res) => {
    try {
      const couponId = req.params.couponId;
      const updates = req.body;
  
      const existingCoupon = await Coupon.findById(couponId);
  
      if (!existingCoupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }
  
      const updatedCoupon = await Coupon.findByIdAndUpdate(
        couponId,
        updates,
        { new: true }
      );
      res.status(200).json(updatedCoupon);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // coupon silme (delete)
router.delete("/:couponId", async (req, res) => {
    try {
      const couponId = req.params.couponId;
  
      const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
  
      if (!deletedCoupon) {
        return res.status(404).json({ error: "Coupon not found." });
      }
  
      res.status(200).json(deletedCoupon);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

module.exports = router;
