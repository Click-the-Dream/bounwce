"use client";

import NoProductCard from "./NoProductCard";
import ProductCard from "./ProductCard";

const ProductList = ({ products, status }: any) => {
  return (
    <div>
      {products?.length === 0 ? (
        <NoProductCard
          title={status === "active" ? "No Active Products" : "No Drafts Saved"}
          subtext={
            status === "active"
              ? "You haven't published any products yet"
              : "You don't have any draft product yet"
          }
        />
      ) : (
        <div className="grid grid-cols-auto gap-3">
          {products?.map((product: { id: any }, idx: any) => (
            <ProductCard key={product?.id || idx} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
