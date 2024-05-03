import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductsPage from "./pages/Admin/Products/CreateProductsPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductsPage from "./pages/Admin/Products/UpdateProductsPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import SliderPage from "./pages/Admin/Slider/SliderPage";
import CreateSliderPage from "./pages/Admin/Slider/CreateSliderPage";
import UpdateSliderPage from "./pages/Admin/Slider/UpdateSliderPage";
import CreateBlogPage from "./pages/Admin/Blogs/CreateBlogPage";
import UpdateBlogPage from "./pages/Admin/Blogs/UpdateBlogPage";
import BlogsPage from "./pages/Admin/Blogs/BlogsPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}  />
      <Route path="/shop" element={<ShopPage />}  />
      <Route path="/cart" element={<CartPage />}  />
      <Route path="/blog" element={<BlogPage />}  />
      <Route path="/contact" element={<ContactPage />}  />
      <Route path="/auth" element={<AuthPage />}  />
      <Route path="/blog/:id" element={<BlogDetailsPage />}  />
      <Route path="/product/:id" element={<ProductDetailsPage />}  />
      <Route path="/shop/product/:id" element={<ProductDetailsPage />}  />
      <Route path="/success" element={<Success />}  />

      <Route path="/admin/*" >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage/>}  />
        <Route path="categories" element={<CategoryPage/>}  />
        <Route path="categories/update/:id" element={<UpdateCategoryPage/>}  />
        <Route path="categories/create" element={<CreateCategoryPage/>}  />
        <Route path="products/create" element={<CreateProductsPage />}  />
        <Route path="products" element={<ProductPage />}  />
        <Route path="products/update/:id" element={<UpdateProductsPage/>}  />
        <Route path="coupons" element={<CouponPage />}  />
        <Route path="coupons/create" element={<CreateCouponPage />}  />
        <Route path="coupons/update/:id" element={<UpdateCouponPage/>}  />
        <Route path="orders" element={<OrderPage />} />
        <Route path="slider" element={<SliderPage />} />
        <Route path="slider/update/:id" element={<UpdateSliderPage />}  />
        <Route path="slider/create" element={<CreateSliderPage />}  />
        <Route path="blogs/create" element={<CreateBlogPage />}  />
        <Route path="blogs" element={<BlogsPage />}  />
        <Route path="blogs/update/:id" element={<UpdateBlogPage/>}  />

      </Route>

    </Routes>
  );
}

export default App;