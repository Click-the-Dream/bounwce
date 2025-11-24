import InputField from "./components/InputField"
import { useFormContext } from "react-hook-form"

const ProductDetails = () => {
    const {register, formState: {errors} } = useFormContext();
    const categories = [
        {label: "sport", value: "sport"},
        {label: "electronics", value: "electronics"}
    ]
    const availability = [
        {label: "In Stock", value: "in-stock"},
        {label: "Pre-Order", value: "pre-order"},
        {label: "Out of Stock", value: "out-of-stock"}
    ]
  return (
    <div className="bg-white rounded-[10px] p-5">
        <h1 className="text-[14px]">Basic Information</h1>
        <p className="text-[13px] text-[#717182] mb-4">Essential details about your product</p>

        
            <InputField 
                label={"Product Name *"}
                type={"text"}
                placeholder={"Enter product name"}
                error={errors.productName}
                {...register("productName", { required: "Product Name is required" })}
            />
            <InputField 
                label={"Description *"}
                type={"textarea"}
                placeholder={"Describe your product in detail..."}
                error={errors.description}
                {...register("description", { required: "Product Description is required" })}
            />
            <div>
                <InputField 
                    label={"Category *"}
                    type={"select"}
                    placeholder={"Select category"}
                    options={categories}
                    error={errors.category}
                    {...register("category", { required: "Product Category is required" })}
                />

                <InputField 
                    label={"Availability *"}
                    placeholder={"Select availability"}
                    type={"select"}
                    options={availability}
                    error={errors.availability}
                    {...register("availability", { required: "Product availability is required" })}
                />
            </div>
    </div>
  )
}

export default ProductDetails