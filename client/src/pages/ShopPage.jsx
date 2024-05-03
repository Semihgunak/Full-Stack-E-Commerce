import {Fragment} from "react"
import Products from "../components/Products/Products"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import ShopProducts from "../components/Products/ShopProducts"

const ShopPage = () => {
  return (
    <Fragment>
        
        <ShopProducts />
        <CampaignSingle />
        <Products />
    </Fragment>
  )
}

export default ShopPage