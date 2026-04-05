import { useNavigate } from 'react-router-dom'; // Added
import useProduct from '../../../hooks/useProduct';
import { onPrompt } from '../../../utils/notifications/onPrompt';

const categories = [
    { name: 'Concert buddy' },
    { name: 'Church community' },
    { name: 'Weekend date' },
    { name: 'Football partners' },
    { name: 'Jollof rice' },
    { name: 'Startup Events' },
    { name: 'Shawarma near me' },
]
const CategoryList = () => {
    const navigate = useNavigate();
    const { useGetProductCategories } = useProduct();
    //const { data: categories = [] } = useGetProductCategories();

    const handleCategoryClick = (categoryName) => {
        onPrompt({
            title: "Category search coming soon!",
            message: "We're working hard to bring you this feature. Stay tuned for updates!",
        })
        // Navigates to /products?category=CategoryName
        // navigate(`/marketplace?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-[14px] mt-5 max-w-[650px]">
            {categories?.map((cat, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(cat?.name)}
                    className="cursor-pointer px-5 py-2 text-[12px] font-medium border-[0.5px] border-[#BDBDBD] rounded-full bg-white hover:bg-white/50 transition-all text-gray-700 active:scale-95"
                >
                    {cat?.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryList;