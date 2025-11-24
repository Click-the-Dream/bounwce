import VendorHeader from "../../vendorDashboard/components/ui/VendorHeader"
import { useNavigate } from "react-router-dom"
import ProductDetails from "../ProductDetails";
import ProductImages from "../ProductImages"
import { useForm, FormProvider } from "react-hook-form";
import ProductActions from "../ProductActions";
import PricingInventory from "../PricingInventory";
import ProductTags from "../ProductTags";
import HelpSection from "../HelpSection";

const AddProductPage = () => {
    const navigate = useNavigate();
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

    const onSubmit = (data) => {
        console.log(data);        
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
                        <ProductActions /> 
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