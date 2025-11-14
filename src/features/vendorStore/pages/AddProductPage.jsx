import VendorHeader from "../../vendorDashboard/components/ui/VendorHeader"
import { useNavigate } from "react-router-dom"
import ProductDetails from "../ProductDetails";
import { useForm, FormProvider } from "react-hook-form";
import ProductActions from "../ProductActions";

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
                className="px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <ProductDetails />
                <ProductActions />
            </form>
        </div>
    </FormProvider>
    
  )
}

export default AddProductPage