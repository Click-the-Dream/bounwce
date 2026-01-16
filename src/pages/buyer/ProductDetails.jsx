import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../components/buyer/Navbar";
import { useState } from "react";
import { ratingsIcon, stockIcon } from "../../assets";
import { formatCurrency } from "../../utils/formatters";
import VendorFeatureCard from "../../components/buyer/VendorFeatureCard";
import { BsTruck } from "react-icons/bs";
import { FiShield } from "react-icons/fi";
import { LuBox, LuStore } from "react-icons/lu";
import { CiStar } from "react-icons/ci";

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { product, vendorInfo } = location.state || {};
    console.log(product);
    console.log(vendorInfo);
    
    const [ activeImage, setActiveImage ] = useState(product?.image || "");
    const imageList = [
        product?.image,
        product?.image,
        product?.image,
        product?.image
    ]
    const specifications = [
        {label: "Category", value: product.category},
        {label: "Stock", value: "12 items available"},
        {label: "Availability", value: "in stock"},
        {label: "Rating", value: `${product.rating}/5.0 (203 reviews)`}
    ]
    
  return (
    <div className="bg-[#ECECF080] min-h-screen ">
        <Navbar />

        {/* main layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mb-6 max-w-5xl mx-auto px-6">
            {/* left side - image gallery */}
            <div className="flex flex-col gap-4 w-full lg:w-[50%]">
                <div className="w-full h-[400px] bg-white border-gray-200 border rounded-md flex items-center justify-center p-2">
                    <img 
                        src={activeImage}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>
                
                <div className="flex gap-2 items-center">
                    {
                        imageList.map((img) => (
                        <button
                            onClick={() => setActiveImage(img)}
                            className="rounded-md border border-gray-200 bg-white"
                        >
                            <img 
                                src={img}
                                className="w-full h-[40]"
                            />
                        </button> 
                        ))
                    }                
                </div>
            </div>
                
            {/* right side - product details */}
            <div className="w-full lg:w-[50%]">
                <div className="flex flex-col gap-3 items-start mb-5">
                    <span className="border border-[#0000001A] px-2 py-1 rounded-2xl text-[8px]">{product.category}</span>
                    <span className="text-[12px] font-semibold">{product.name}</span>
                    <span className="flex gap-2 items-center text-gray-400">
                        <img src={ratingsIcon}/>{product.rating} (203 Reviews)
                    </span>
                    <span className="flex gap-2 items-center">
                        <img src={stockIcon}/>12 items in stock
                    </span>
                    <span className="text-[28px] font-semibold">{formatCurrency(product.price)}</span>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                    <h1 className="text-[15px] font-semibold">Description</h1>
                    <p className="text-gray-400 text-[12px]">Bluetooth Speaker - High quality product from TechGadgets. Perfect for your needs with excellent durability and performance. This item has been carefully selected and verified by our team.</p>
                </div>

                <div className="mb-5">
                    <h1 className="text-[12px] font-medium mb-2">Features</h1>
                    <ul className="list-disc ml-4 text-[12px] text-gray-400 flex flex-col gap-1">
                        <li>High Quality Material</li>
                        <li>Fast Delivery</li>
                        <li>Verified Vendor</li>
                        <li>Secure Payment</li>
                    </ul>
                </div>

                <div className="flex gap-2">
                    <VendorFeatureCard icon={BsTruck} feature={"Fast Delivery"}/>
                    <VendorFeatureCard icon={FiShield} feature={"Secure Payment"}/>
                    <VendorFeatureCard icon={LuBox} feature={"Quality Product"}/>
                </div>
            </div>  
        </div>        
        
        {/* specifications and vendor information */}
        <div className="flex gap-4 items-start w-full max-w-5xl mx-auto px-6">
            {/* specifications */}
            <div className="bg-white rounded-lg p-2 flex-1">
                <h1 className="text-[14px] font-medium mb-6">Specifications</h1>
                <div className="flex flex-col gap-5">
                    {
                        specifications.map(spec => (
                            <div key={spec.label}>
                                <div className="flex justify-between items-center text-[13px] mb-2">
                                    <span className="text-gray-400">{spec.label}</span>
                                    <span className="font-medium">{spec.value}</span>
                                </div>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>
            
            {/* vendor information */}
            <div className="bg-white px-7 py-5 rounded-lg flex-1">
                <h1 className="text-[12.68px] mb-3">Vendor Information</h1>
                <div className="flex gap-3 items-center">
                    <div>
                        <img src="" />
                        <div className="bg-[#ECECF0] text-[19px] p-2 rounded-full w-[50px] flex justify-center">PE</div>
                    </div>

                    <div className="text-[12px] flex flex-col gap-1 items-start">
                        <p className="flex gap-2">
                            <span className="text-[12px] font-medium">{vendorInfo.name}</span>
                             -- 
                             <span className="text-gray-400">Joined: March 2024</span>
                        </p>
                        <p className="flex gap-1 items-center text-gray-400">
                            <CiStar className="text-[#FDC700]"/> 
                            <span>{product.rating}</span>
                            <span>(203 reviews)</span>
                        </p>
                        <p className="flex gap-1 items-center text-gray-400">
                            <LuStore />
                            <span>45 Products</span>
                        </p>
                        <button>
                            Visit Store
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails