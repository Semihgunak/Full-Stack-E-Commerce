import "./CategoryItem.css";
import { Link } from "react-router-dom";



function CategoryItem({ data ,products,filtered,setFiltered }) {
  const handlefilter = (dataId) =>{
    setFiltered(products.filter((item)=>item.category===dataId))
  }
  return (
    <li className="category-item">
      
      <Link href="#" onClick={()=>handlefilter(data._id)} >
        <img src={data.img} alt="" height={175} className="category-image" />
        <span className="category-title"> {data.name} </span>
      </Link>
    </li>
  );
}

export default CategoryItem;
