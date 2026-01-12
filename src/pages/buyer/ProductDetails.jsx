import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../components/buyer/Navbar";
import { useState } from "react";

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
    
  return (
    <div>
        <Navbar />

        {/* main layout */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-5xl mx-auto px-6">
            {/* left side - image gallery */}
            <div className="flex flex-col gap-4 w-full md:w-[50%]">
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
            <div className="w-full md:w-[50%]">
                <div>
                    <span>{product.category}</span>
                    <span>{product.name}</span>
                    <span>{product.rating}</span>
                    <span>{product.rating}</span>
                    <span>${product.price}</span>
                </div>

                <div>
                    <h1>Description</h1>
                    <p>Bluetooth Speaker - High quality product from TechGadgets. Perfect for your needs with excellent durability and performance. This item has been carefully selected and verified by our team.</p>
                </div>

                <div>
                    <h1>Features</h1>
                    <ul>
                        <li>High Quality Material</li>
                        <li>Fast Delivery</li>
                        <li>Verified Vendor</li>
                        <li>Secure Payment</li>
                    </ul>
                </div>
            </div>  
        </div>        
    </div>
  )
}

export default ProductDetails