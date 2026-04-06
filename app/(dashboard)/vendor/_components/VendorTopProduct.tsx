import { useEffect, useState } from "react";
import noTopProducts from "../../../assets/top-products.svg";
import VendorCardLayout from "./VendorCardLayout";
import Image from "next/image";
import SafeImage from "@/app/_components/SafeImage";
const VendorTopProducts = ({ dashboardData }: any) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const topProducts = dashboardData?.top_products || [];
    setTopProducts(topProducts);
  }, [dashboardData]);

  return (
    <VendorCardLayout title={"Top Products"} buttonText={"View All"}>
      <div>
        {topProducts.length === 0 ? (
          <Image
            src={noTopProducts.src}
            alt="No orders"
            width={130}
            height={90}
            className="w-[132.78px] h-[99.1px] my-5 mx-auto"
          />
        ) : (
          <article>
            {topProducts.map((data: any) => (
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <SafeImage
                    src={data.productImg}
                    alt={data.productName}
                    width={20}
                    height={20}
                    className="w-auto"
                  />

                  <div>
                    <h1>{data.productName}</h1>
                    <p className="text-ash text-[11px]">
                      <span>{data.salesNumber}sales</span>
                      <span>-</span>
                      <span>₦{data.totalRevenue}</span>
                    </p>
                  </div>
                </div>

                <div className="text-[7.54px] border p-1 rounded-[6.75px]">
                  #{data.productNumber}
                </div>
              </div>
            ))}
          </article>
        )}
      </div>
    </VendorCardLayout>
  );
};

export default VendorTopProducts;
