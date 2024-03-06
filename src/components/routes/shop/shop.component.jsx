// import SHOP_DATA from "../../../shop-data.json"
import { useContext } from "react";
import { ProductsContext } from "../../../context/products.context";
import ProductCard from "../../product-card/product-card.component";
import './shop.styles.scss'
const Shop =()=>{
    const {products} =useContext(ProductsContext)
    return(
       <div className="products-containers">
        {products.map((product)=>(
            <div key={product.id}>
            
                <ProductCard key={product.id} product={product} />*
           
            </div>
        ))
        }
       </div> 
    )
}
export default Shop;