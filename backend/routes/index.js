const express = require("express");
const router = express.Router();

// diğer rota dosyalarını içe aktarıyoruz

const productRoute = require("./products.js")
const categoryRoute = require("./categories.js")
const authRoute = require("./auth.js")
const couponRoute = require("./coupons.js")
const userRoute = require("./users.js")
const paymentRoute = require("./payment.js")
const sliderRoute = require("./slider.js")
const blogRoute = require("./blogs.js")

 
// her rotayı ilgili yol altında kullanıyoruz

router.use("/categories",categoryRoute)
router.use("/products",productRoute)
router.use("/auth",authRoute)
router.use("/coupons",couponRoute)
router.use("/users",userRoute)
router.use("/payment",paymentRoute)
router.use("/slider",sliderRoute)
router.use("/blogs",blogRoute)


module.exports = router;