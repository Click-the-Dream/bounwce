import { useState } from "react"
import { productImg } from "../../../assets"
import ActionButton from "./actionButton"
import { IoMdAdd } from "react-icons/io";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([
    {stock: 25},
    {stock: 23},
    {stock: 27},
    {stock: 28}
  ])
  return (
    <div>
        {
          products.length === 0 ? (
            <div className="bg-white  rounded-[12.75px]">
                <div className="flex flex-col justify-center items-center gap-2 py-[30px]">
                <img 
                  src={productImg}
                  width={60}
                />
                <h1 className="text-[14px] font-semibold">No Active Products</h1>
                <p className="text-[13px]">You haven't published any products</p>
              </div>

              <div className="p-3">
                <ActionButton 
                  label={"Add Your Product"}
                  icon={IoMdAdd}
                  className="bg-black text-white"
                />
              </div>
              
            </div>
            
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {
                products.map((product) => (
                  <ProductCard 
                    stockAmount={product.stock}
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