import { useFormContext } from "react-hook-form";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

const ProductImages = () => {
   const { register, watch, setValue, formState: { errors } } = useFormContext();
   const slots = [0, 1, 2, 3]

    const renderPreview = (index) => {
        const fileList = watch(`images.${index}`);
        if (fileList && fileList.length > 0) {
            return URL.createObjectURL(fileList[0]);
        }
        return null;
    }

    const removeImage = (index) => {
        setValue(`images.${index}`, null);
    }
  return (
    <div className="bg-white rounded-[10px] p-5">
      <h1 className="text-[14px]">Product Images</h1>
      <p className="text-[13px] text-[#717182] mb-4">Add photos of your product ( up to 4 images )</p>

      <div 
        className="grid lg:grid-cols-2 xl:grid-cols-4 gap-2"
      >
            {
                slots.map((index) => {
                    const previewUrl = renderPreview(index);
                    const fieldName = `images.${index}`;
                    const hasError = errors?.images?.[index];

                    return (
                        <div 
                          key={index}
                          className="relative"
                        >
                            
                            {/* invisible input */}
                            <input 
                                type="file"
                                id={`file-slot-${index}`}
                                accept="image/*"
                                className="hidden"
                                {...register(fieldName, {
                                    required: index === 0 ? "Main Image is required" : false
                                })}
                            />

                            {/* The visual box */}
                            <label 
                                htmlFor={`file-slot-${index}`}  
                                className="flex flex-col items-center justify-center w-full h-[100px] border-2 border-dashed rounded-xl cursor-pointer transition-all text-[#DFDFDF]"                              
                            >
                                {
                                    previewUrl ? (
                                        <img 
                                            src={previewUrl}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover rounded-xl"
                                        />

                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <CiImageOn size={25}/>
                                            <span className="text-[10px]">Click to upload</span>
                                        </div>
                                    )
                                }
                            </label>
                            {
                                previewUrl && (
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 left-2 border rounded-lg"
                                    >
                                        <IoMdTrash size={20} className="shadow-lg bg-white"/>
                                    </button>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>

        {
            errors?.images?.[0] && (
                <p>
                    {errors.images[0].message}
                </p>
            )
        }
    </div>
  )
}
export default ProductImages