import { useEffect, useState } from 'react'
import VendorCardLayout from '../VendorCardLayout'
import { noTopProducts, productImg } from '../../../../assets';

const VendorTopProducts = () => {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const dummyData = [
            {productNumber: "1", productName: "DFDF", salesNumber: "44", totalRevenue: "100,000", productImg: productImg}
        ]
        setTopProducts(dummyData);
    }, [])
    
  return (
    <VendorCardLayout
        title={"Top Products"}
        buttonText={"View All"}
    >
        <div>
            {
                topProducts.length === 0 ? (
                    <img 
                        src={noTopProducts}
                        alt="no top products"
                        className='mx-auto'
                    />  
                ) : (
                    <article>
                        {
                            topProducts.map((data) => (
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-2'>
                                        <img
                                            src={data.productImg}
                                            alt={data.productName}
                                        />

                                        <div >
                                            <h1>{data.productName}</h1>
                                            <p className='text-ash text-[11px]'><span>{data.salesNumber}sales</span><span>-</span><span>₦{data.totalRevenue}</span></p>
                                        </div>
                                    </div>

                                    <div className='text-[7.54px] border-[1px] p-1 rounded-[6.75px]'>
                                        #{data.productNumber}
                                    </div>  
                                </div>
                            ))
                        }                        
                    </article>
                )
            }
        </div>
    </VendorCardLayout>
  )
}

export default VendorTopProducts