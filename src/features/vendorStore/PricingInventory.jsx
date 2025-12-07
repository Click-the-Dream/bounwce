import { useForm, useFormContext } from "react-hook-form"
import InputField from "./components/InputField"

const PricingInventory = () => {
  const { register, formState: {errors} } = useFormContext();
  return (
    <div className="bg-white rounded-[10px] p-5">
      <h1 className="text-[14px] mb-4">Pricing & Inventory</h1>

      <div className="flex flex-col md:flex-row justify-between w-full gap-3">
        <div className="flex-1">
          <InputField 
            label={"Price () *"}
            type={"number"}
            placeholder={"0"}
            error={errors.price}
            {...register("price", { required: "Price is required" })}
          />
        </div>        

        <div className="flex-1">
          <InputField 
            label={"Stock Quantity *"}
            type={"number"}
            placeholder={"0"}
            error={errors.stockQuantity}
            {...register("stockQuantity", { required: "Stock quantity is required" })}
          />
        </div>
        
      </div>
      
    </div>
  )
}

export default PricingInventory