import ProductCard from "./components/ProductCard";
import NoProductCard from "./components/NoProductCard";

const ProductSection = ({ products, status }) => {
  return (
    <div>
      {products?.length === 0 ? (
        <NoProductCard
          title={status === "active" ? "No Active Products" : "No Drafts Saved"}
          subtext={status === "active" ? "You haven't published any products yet" : "You don't have any draft product yet"}
        />
      ) : (
        <div className="grid grid-cols-auto gap-3">
          {products?.map((product, idx) => (
            <ProductCard
              key={product?.id || idx}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
