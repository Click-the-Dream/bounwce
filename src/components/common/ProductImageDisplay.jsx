"use client";
import { useState } from "react";

export default function ProductImageDisplay({
    images = [],
    height = "h-[250px]",
    thumbSize = "w-12 h-12",
    showThumbnails = true,
    thumbStyle = ""
}) {
    const [mainIndex, setMainIndex] = useState(0);

    return (
        <section className="relative w-full h-full flex flex-col">
            {/* MAIN IMAGE */}
            <div className={`flex-1 bg-white ${height} flex items-center justify-center`}>
                {images?.[mainIndex] ? (
                    <img
                        src={images[mainIndex].url}
                        alt={`product-image-${mainIndex}`}
                        className="object-cover w-full h-full aspect-square"
                    />
                ) : (
                    <div className="text-gray-400">No Image</div>
                )}
            </div>

            {/* THUMBNAILS */}
            {showThumbnails && images.length > 1 && (
                <div className="w-full ">
                    <div className={`flex gap-2 p-2 overflow-x-auto ${thumbStyle}`}>
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img.url}
                                alt={`thumbnail-${idx}`}
                                className={`${thumbSize} object-cover aspect-square bg-white rounded cursor-pointer border-2 ${idx === mainIndex
                                    ? "border-orange/70"
                                    : "border-gray-200"
                                    }`}
                                onClick={(e) => { e.stopPropagation(); setMainIndex(idx) }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}