import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../components/buyer/Navbar";
import { useEffect, useState } from "react";
import { ratingsIcon, stockIcon } from "../../assets";
import { formatCurrency } from "../../utils/formatters";
import VendorFeatureCard from "../../components/buyer/VendorFeatureCard";
import { BsTruck } from "react-icons/bs";
import { FiShield, FiShoppingCart } from "react-icons/fi";
import { LuBox, LuStore } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { useStore } from "../../context/storeContext";
import useCart from "../../hooks/useCart"
import Header from "../../components/buyer/Header";
import { IoClose } from "react-icons/io5";

const ProductDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, setCart } = useStore();
    const { addToCart, removeFromCart } = useCart();
    const [ quantity, setQuantity ] = useState(1);
    const [ isModalOpen, setIsModalOpen] = useState(false);

    const { product, vendorInfo } = location.state || {};
    console.log("location state: ", location.state);
    console.log("product data: ", product);
    
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

    // redirect if state is missing
    useEffect(() => {
        if(!product) {
            console.log("redirecting because product is missing");            
            navigate("/marketplace")
        }
    }, [product, navigate])

    if(!product) return null;

    // check if product is in cart
    const isInCart = cart?.some((vendor) =>
        vendor.items.find((item) => item.id === product.id)
    );

    // update product quantity
    const updateQuantity = (vendorIndex, itemIndex, delta) => {
    setCart((prev) =>
      prev.map((vendor, vIdx) =>
        vIdx !== vendorIndex
          ? vendor
          : {
              ...vendor,
              items: vendor.items.map((item, iIdx) =>
                iIdx !== itemIndex
                  ? item
                  : { ...item, quantity: Math.max(1, item.quantity + delta) }
              ),
            }
      )
    );
    };

    // remove product from cart
    const removeItem = (vendorIndex, itemIndex) => {
            setCart((prev) =>
                prev
                    .map((vendor, vIdx) =>
                        vIdx !== vendorIndex
                            ? vendor
                            : {
                                ...vendor,
                                items: vendor.items.filter((_, iIdx) => iIdx !== itemIndex),
                            }
                    )
                    .filter((vendor) => vendor.items.length > 0) // Remove empty vendors
            );
    };

  let currentVendorIndex = -1;
  let currentItemIndex = -1;
  let currentQuantity = 1;

  if ( cart && isInCart ) {
    cart.forEach((vendor, vIdx) => {
        const iIdx = vendor.items.findIndex((item) => item.id === product.id)
        if( iIdx !== -1 ) {
            currentVendorIndex = vIdx;
            currentItemIndex = iIdx;
            currentQuantity = vendor.items[iIdx].quantity;
        } 
    })
  }

  const handleAddToCart = () => {
    setCart((prevCart) => {
        const cartClone = [...prevCart];
        const vendorName = vendorInfo?.name 
        const vendorIndex = cartClone.findIndex(v => v.name === vendorName);

        if(vendorIndex > -1) {
            const itemIndex = cartClone[vendorIndex].items.findIndex((i) => i.id === product.id);

            if(itemIndex > -1) {
                cartClone[vendorIndex].items[itemIndex].quantity = quantity;
                cartClone[vendorIndex].items[itemIndex].status = "cart";
            } else {
                cartClone[vendorIndex].items.push({...product, quantity: quantity, status: "cart"})
            }
        } else {
            cartClone.push({
                name: vendorName,
                items: [{ ...product, quantity: quantity, status: "cart"}]
            });
        }
        return cartClone;
    })
  }
    
  return (
    <div className="bg-[#ECECF080] min-h-screen ">
        <Navbar />

        <div className="px-6">
            <Header 
                title="Product Details"
            /> 
        </div>
        

        {/* main layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mb-6 max-w-5xl mx-auto px-6">
            {/* left side - image gallery */}
            <div className="flex flex-col gap-4 w-full lg:w-[50%]">
                <div className="w-full h-[500px] bg-white border-gray-200 border rounded-md flex items-center justify-center p-2">
                    <div 
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img 
                            src={activeImage}
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"                        
                        />  
                    </div>
                    
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

                <div className="bg-white rounded-md p-4 mb-5">
                    {
                        isInCart ? (
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-5 items-center">
                                    <button
                                        onClick={() => {
                                            if (currentQuantity > 1) {
                                                // If > 1, update logic
                                                updateQuantity(currentVendorIndex, currentItemIndex, -1);
                                            } else {
                                                removeItem(currentVendorIndex, currentItemIndex);
                                            }
                                        }}
                                        className="bg-black text-white px-3 py-1 rounded-md text-[12px]"
                                    >
                                        -
                                    </button>

                                    <span className="text-[13px]">{currentQuantity}</span>

                                    <button
                                        disabled={currentQuantity >= 99}
                                        onClick={() => updateQuantity(currentVendorIndex, currentItemIndex, 1)}
                                        className="bg-black text-white px-3 py-1 rounded-md text-[12px]"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-[12px] text-[#00000082]">({currentQuantity} item(s) added)</p>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <div className="flex gap-7 items-center border border-[#0000001A] rounded-md text-[12p] p-2">
                                    <button
                                        onClick={() => setQuantity((prev) => Math.min(1, prev - 1))}
                                    >
                                        -
                                    </button>

                                    <span>{quantity}</span>

                                    <button
                                        onClick={() => setQuantity((prev) => Math.min(99, prev + 1))}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex justify-center items-center gap-2 bg-black text-white flex-1 rounded-md text-[12px]"
                                >
                                    <FiShoppingCart />
                                    <span>Add to cart</span>
                                </button>
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                    <VendorFeatureCard icon={BsTruck} feature={"Fast Delivery"}/>
                    <VendorFeatureCard icon={FiShield} feature={"Secure Payment"}/>
                    <VendorFeatureCard icon={LuBox} feature={"Quality Product"}/>
                </div>
            </div>  
        </div>        
        
        {/* specifications and vendor information */}
        <div className="flex flex-col lg:flex-row gap-4 items-start w-full max-w-5xl mx-auto px-6">
            {/* specifications */}
            <div className="w-full bg-white rounded-lg p-2 flex-1">
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
            <div className="w-full bg-white px-7 py-5 rounded-lg flex-1">
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
        
        {/* Modal implementation */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
                <div className="bg-white w-[50%] rounded-xl">
                    <div className="flex justify-between items-center px-4">
                       <h1 className="text-[14px]">Product Images</h1>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className=" text-black p-2 hover:bg-white/10 rounded-full transition-colors z-50"
                        >
                            <IoClose size={24} />
                        </button> 
                    </div>                

                {/* Large Image Area */}
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                     <img 
                        src={activeImage} 
                        className="w-[70%] object-contain"
                        alt="Full View"
                    />
                </div>

                {/* Thumbnails Inside Modal */}
                <div className="w-full flex items-center justify-center gap-4 mt-4 mb-2">
                     {imageList.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation(); 
                                setActiveImage(img);
                            }}
                            className={`
                                w-16 h-16 rounded-md overflow-hidden border-2 transition-all
                                ${activeImage === img ? 'border-orange scale-110 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}
                            `}
                        >
                            <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                </div>
                </div>
            </div>
        )}        
    </div>
  )
}

export default ProductDetails