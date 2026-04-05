import Navbar from "../../components/buyer/Navbar";
import Header from "../../components/buyer/Header";
import ProductCard from "../../components/buyer/ProductCard";
import useProduct from "../../hooks/useProduct";
import ProductCardSkeleton from '../../components/buyer/ProductCardSkeleton'
const MarketPlace = () => {
  const { useGetAllProducts } = useProduct();
  const { data, isLoading, error } = useGetAllProducts();

  const products = data?.products || [];

  return (
    <div className="bg-[#ECECF080] min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pb-8">
        <Header title="Marketplace" />

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-4">
            Failed to load products. Please try again.
          </div>
        )}

        {/*  LOADING STATE */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-auto gap-3 md:gap-6 place-items-center">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          /*  EMPTY STATE */
          <div className="text-center text-gray-500 py-10">
            No products available
          </div>
        ) : (
          /* DATA */
          <div className="grid grid-cols-2 md:grid-cols-auto gap-3 md:gap-6 place-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
