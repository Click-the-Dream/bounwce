import { useState } from "react"
import NoProductCard from "./NoProductCard"
import ProductCard from "./ProductCard"


const DraftSection = () => {
    const [draftProducts, setDraftProducts] = useState([
        {stock: 25},
        {stock: 23},
    ])
  return (
    <div>
        {
            draftProducts.length === 0 ? (
                <NoProductCard 
                    title={"No Drafts Saved"}
                    subtext={"You don't have any draft product yet"}
                />
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {
                draftProducts.map((product) => (
                  <ProductCard 
                    stockAmount={product.stock}
                    status={"Draft"}
                  />
                ))
              }
              
            </div>
            )
        }
    </div>
  )
}

export default DraftSection