import React from "react";
import Blogs from "../components/Blogs/Blogs";
import Campaigns from "../components/Campaigns/Campaigns";
import Categories from "../components/Categories/Categories";

import Slider from "../components/Layout/Slider/Slider";
import Products from "../components/Products/Products";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";

const HomePage = () => {
  return (
    <React.Fragment>
      <Slider />
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
