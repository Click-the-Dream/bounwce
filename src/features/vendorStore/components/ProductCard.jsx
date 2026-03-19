import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import useProduct from "../../../hooks/useProduct";

const ProductCard = ({ product, status }) => {
    const { toggleProductState } = useProduct();
    const [mainIndex, setMainIndex] = useState(0); // current main image
    const images = product?.images || [];

    const handleProductState = async () => {
        toggleProductState.mutate(product?.id)
    };

    return (
        <div className="w-full border rounded-lg overflow-hidden shadow-sm">
            <section className="relative">
                {/* MAIN IMAGE */}
                <div className="bg-gray-100 h-[250px] flex items-center justify-center">
                    {images[mainIndex] ? (
                        <img
                            src={images[mainIndex].url}
                            alt={`product-image-${mainIndex}`}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="text-gray-400">No Image</div>
                    )}
                </div>

                {/* THUMBNAILS */}
                <div className="absolute bottom-0 left-0 w-full">
                    {images.length > 1 && (
                        <div className="flex gap-2 p-2 overflow-x-auto">
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.url}
                                    alt={`thumbnail-${idx}`}
                                    className={`w-12 h-12 object-cover rounded cursor-pointer border-2 ${idx === mainIndex
                                        ? "border-blue-500"
                                        : "border-gray-200"
                                        }`}
                                    onClick={() => setMainIndex(idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* PRODUCT DETAILS */}
            <div className="border-t px-5 py-4 bg-white">
                <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                        <h1 className="uppercase text-[12px] font-medium">{product?.name}</h1>
                        <p
                            className={`rounded-[9px] px-[13px] py-[2px] text-[9px] font-bold ${product?.state === "draft" ? "bg-gray-400 text-white" : "bg-[#38C066] text-white"
                                }`}
                        >
                            {product?.state === "draft" ? "Draft" : "Live"}
                        </p>
                    </div>

                    <p className="text-[#000000] text-[11px]">{product?.description}</p>
                    <p className="text-[11px] flex justify-between">
                        <span className="font-medium">Category:</span>
                        <span>{product?.category}</span>
                    </p>
                    <p className="text-[11px] flex justify-between">
                        <span className="font-medium">Price:</span>
                        <span>${product?.amount}</span>
                    </p>
                    <p className="text-[11px] flex justify-between">
                        <span className="font-medium">Stock:</span>
                        <span>{product?.stock}</span>
                    </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 justify-between flex-wrap">
                    <div className="flex gap-3">
                        <button className="text-[10px] font-semibold border-[1px] rounded-[6.75px] border-[#00000036] px-2 py-1 flex gap-1 items-center">
                            <TbEdit /> Edit
                        </button>

                        <button
                            onClick={handleProductState}
                            disabled={toggleProductState.isPending}
                            className={`text-[10px] font-semibold border-[1px] rounded-[6.75px] border-[#00000036] px-2 py-1 ${product?.state === "draft"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                        >
                            {toggleProductState.isPending
                                ? "Processing..."
                                : product?.state === "draft"
                                    ? "Publish"
                                    : "Unpublish"}
                        </button>
                    </div>

                    <button className="text-[10px] font-semibold border-[1px] rounded-[6.75px] border-[#00000036] px-2 py-1">
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;