import ProductCard from "./components/ProductCard";
import NoProductCard from "./components/NoProductCard";

const ProductSection = ({ products }) => {
  return (
    <div>
      {products?.length === 0 ? (
        <NoProductCard
          title={"No Active Products"}
          subtext={"You haven't published any products yet"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products?.map((product, idx) => (
            <ProductCard
              key={product?.id || idx}
              stockAmount={product.stock}
              status={"Live"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
