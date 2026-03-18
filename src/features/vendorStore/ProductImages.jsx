import { useFormContext } from "react-hook-form";
import { IoMdTrash } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useState, useEffect } from "react";

const ProductImages = () => {
    const { watch, setValue, formState: { errors } } = useFormContext();
    const [previews, setPreviews] = useState([]);

    const images = watch("images") || [];

    useEffect(() => {
        // filter out null/undefined
        const validFiles = images.filter(file => file instanceof File);
        const urls = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(urls);

        return () => urls.forEach(url => URL.revokeObjectURL(url));
    }, [images]);

    const handleFilesChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(f => f instanceof File);
        const newImages = [...images.filter(f => f instanceof File), ...validFiles].slice(0, 4);
        setValue("images", newImages);
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setValue("images", updatedImages);
    };

    return (
        <div className="bg-white rounded-[10px] p-5">
            <h1 className="text-[14px]">Product Images</h1>
            <p className="text-[13px] text-[#717182] mb-4">Add photos of your product (up to 4 images)</p>

            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative">
                        {previews[index] ? (
                            <>
                                <img
                                    src={previews[index]}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-[100px] object-cover rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 left-2 border rounded-lg"
                                >
                                    <IoMdTrash size={20} className="shadow-lg bg-white" />
                                </button>
                            </>
                        ) : (
                            <label
                                htmlFor={`file-input-${index}`}
                                className="flex flex-col items-center justify-center w-full h-[100px] border-2 border-dashed rounded-xl cursor-pointer text-[#DFDFDF]"
                            >
                                <CiImageOn size={25} />
                                <span className="text-[10px]">Click to upload</span>
                            </label>
                        )}

                        <input
                            type="file"
                            id={`file-input-${index}`}
                            accept="image/*"
                            className="hidden"
                            onChange={handleFilesChange}
                        />
                    </div>
                ))}
            </div>

            {errors?.images?.[0] && (
                <p className="text-[10px] text-red-700 mt-2">{errors.images[0].message}</p>
            )}
        </div>
    );
};

export default ProductImages;