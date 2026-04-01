const ProductCardSkeleton = () => {
    return (
        <div className="w-[220px] bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">

            {/* Image */}
            <div className="h-60 bg-gray-200" />

            <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-300 rounded w-1/3" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
