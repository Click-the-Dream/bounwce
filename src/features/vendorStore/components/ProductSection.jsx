import { useState } from "react"
import ProductCard from "./ProductCard";
import NoProductCard from "./NoProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([
    {stock: 25},
    {stock: 23},
    {stock: 27},
  ])
  return (
    <div>
        {
          products.length === 0 ? (
            <NoProductCard 
              title={"No Active Products"}
              subtext={"You haven't published any products yet"}
            />            
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {
                products.map((product) => (
                  <ProductCard 
                    stockAmount={product.stock}
                    status={"Live"}
                  />
                ))
              }              
            </div>
          )
        }
    </div>
  )
}

export default ProductSection