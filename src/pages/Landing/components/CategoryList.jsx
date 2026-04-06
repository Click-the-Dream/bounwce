import { useNavigate } from 'react-router-dom'; // Added
import useProduct from '../../../hooks/useProduct';
import { onPrompt } from '../../../utils/notifications/onPrompt';

const categories = [
    {
        "name": "Weekend date",
        "suggestion": "Looking for someone to go out with this weekend."
    },
    {
        "name": "Gym partner",
        "suggestion": "Need a gym partner nearby to stay consistent."
    },
    {
        "name": "Food spot",
        "suggestion": "Looking for somewhere nice to eat."
    },
    {
        "name": "Networking event",
        "suggestion": "Looking for a social or  business event to attend."
    }
]
const CategoryList = ({ setQuery }) => {
    const navigate = useNavigate();
    //const { useGetProductCategories } = useProduct();
    //const { data: categories = [] } = useGetProductCategories();

    const handleCategoryClick = (cat) => {
        setQuery(cat?.suggestion)
        // Navigates to /products?category=CategoryName
        // navigate(`/marketplace?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-[14px] mt-5 max-w-[650px]">
            {categories?.map((cat, index) => (
                <button
                    key={index}
                    onClick={() => handleCategoryClick(cat)}
                    className="cursor-pointer px-5 py-2 text-[12px] font-medium border-[0.5px] border-[#BDBDBD] rounded-full bg-white hover:bg-white/50 transition-all text-gray-700 active:scale-95"
                >
                    {cat?.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryList;