import VendorHeader from "../../vendorDashboard/components/ui/VendorHeader"
import { useNavigate } from "react-router-dom"
import ProductDetails from "../ProductDetails";
import ProductImages from "../ProductImages"
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import ProductActions from "../ProductActions";
import PricingInventory from "../PricingInventory";
import ProductTags from "../ProductTags";
import HelpSection from "../HelpSection";
import useProduct from "../../../hooks/useProduct";
import { useState } from "react";

const AddProductPage = () => {
    const navigate = useNavigate();
    const { createProduct } = useProduct();
    const [ submitMode, setSubmitMode ] = useState("publish");
    

    const methods = useForm({
        mode: "onSubmit",
        defaultValues: {
            productName: "",
            description: "",
            category: "",
            availability: "",
            price: "",
            stockQuantity: "",
            images: [],
            tags: []
        }
    })
    const { setValue } = methods;
    const onSubmit = async (data) => {
        console.log(data);       
        
        try {
            const formData = new FormData();

            formData.append("productName", data.productName || "");
            formData.append("description", data.description || "");
            formData.append("category", data.category || "");
            formData.append("availability", data.availability || "");
            formData.append("price", data.price || "");
            formData.append("stockQuantity", data.stockQuantity || "");

            // add tags
            if (data.tags && data.tags.length > 0) {
                data.tags.forEach((tag) => {
                    formData.append("tags[]", tag)
                })
            }

            //add images 
            if(data.images && data.images.length > 0) {
                data.images.forEach((image) => {
                    formData.append("images", image[0]);
                })
            }

            formData.append("status", submitMode === "publish" ? "publish" : "draft")

            await createProduct.mutateAsync(formData);

            console.log(`${submitMode} ${formData}`);

            //reset fields
            [
                "productName",
                "description",
                "category",
                "availability",
                "price",
                "stockQuantity",
                "images",
                "tags"
            ].forEach((field) => setValue(field, ""));
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <FormProvider {...methods}>
        <div className="bg-[#ECECF080]">        
            <VendorHeader 
                header={"Store Management"}
                headerDetails={"Add New Product"}
                isBackButton={true}                
            /> 
            
            <form 
                className="px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5 flex flex-col xl:flex-row gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-4 w-full xl:w-[70%]">
                    <div>
                        <ProductDetails />
                    </div>                
                    
                    <div>
                        <PricingInventory />  
                    </div>
                    
                    <div>
                        <ProductImages />  
                    </div>

                    <div>
                        <ProductTags />
                    </div> 
                </div>                

                <div className="flex flex-col gap-4 w-full xl:w-[30%]">
                    <div>
                        <ProductActions setSubmitMode={setSubmitMode}/> 
                    </div>                

                    <div>
                        <HelpSection /> 
                    </div>     
                </div>
            </form>
        </div>
    </FormProvider>    
  )
}

export default AddProductPage