import { useNavigate } from 'react-router-dom'; // Added
import useProduct from '../../../hooks/useProduct';

const CategoryList = () => {
    const navigate = useNavigate();
    const { useGetProductCategories } = useProduct();
    const { data: categories = [] } = useGetProductCategories();

    const handleCategoryClick = (categoryName) => {
        // Navigates to /products?category=CategoryName
        navigate(`/marketplace?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-[14px] mt-5 max-w-[650px]">
            {categories?.map((cat, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(cat?.name)}
                    className="cursor-pointer px-5 py-2 text-[12px] font-medium border border-gray-300 rounded-full bg-white/50 hover:bg-white transition-all text-gray-700 active:scale-95"
                >
                    {cat?.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryList;