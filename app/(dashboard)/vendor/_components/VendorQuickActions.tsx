import { useEffect, useState } from "react";
import noQuickActions from "../../../assets/quick-actions.svg";
import VendorCardLayout from "./VendorCardLayout";
import Image from "next/image";

const VendorQuickActions = ({ dashboardData }: any) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const recentOrders = dashboardData?.recent_orders || [];
    setOrders(recentOrders);
  }, [dashboardData]);

  return (
    <VendorCardLayout title={"Quick Actions"} buttonText={"View All"}>
      <div className="">
        {orders.length === 0 ? (
          <Image
            src={noQuickActions.src}
            alt="No orders"
            width={130}
            height={90}
            className="w-[132.78px] h-[99.1px] my-5 mx-auto"
          />
        ) : (
          <div>
            {orders.map((data: any) => (
              <div
                key={data.orderNumber}
                className="flex justify-between gap-2 mb-4"
              >
                <div>
                  <h1 className="font-bold text-[12px]">{data.orderNumber}</h1>
                  <p className="text-[12px] text-ash">{data.name}</p>
                </div>

                <div className="flex flex-col gap-">
                  <h1 className="font-bold text-[12px]">{data.amount}</h1>
                  <p
                    className={`p-1 w-fit text-[6px] rounded-[6.75px] ${
                      data.status === "completed"
                        ? "text-[#246653] bg-[#DBFCE7]"
                        : data.status === "processing"
                          ? "text-[#2563EB] bg-[#DBEAFE]"
                          : "text-[#9810FA] bg-[#F3E8FF]"
                    }`}
                  >
                    {data.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </VendorCardLayout>
  );
};

export default VendorQuickActions;
