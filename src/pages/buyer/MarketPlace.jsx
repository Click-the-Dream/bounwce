import Navbar from "../../components/buyer/Navbar";
import Header from "../../components/buyer/Header";
import ProductCard from "../../components/buyer/ProductCard";
import { products } from "../../utils/dummies";
const MarketPlace = () => {
  return (
    <div className="bg-[#ECECF080] min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pb-8">
        <Header title="Marketplace" />

        <div className="grid grid-cols-auto gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
