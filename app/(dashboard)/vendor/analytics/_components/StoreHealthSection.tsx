"use client";
import { useState } from "react";
import productListIcon from "../../../../assets/product-list-icon.svg";
import responseRateIcon from "../../../../assets/response-rate-icon.svg";
import starIcon from "../../../../assets/star-icon.svg";
import SharedAnalyticCard from "./SharedAnalyticCard";

const StoreHealthSection = () => {
  const [storeHealthDetails, setStoreHealthDetails] = useState([
    { icon: productListIcon.src, label: "Average Rating", value: `${4.8}/5` },
    { icon: responseRateIcon.src, label: "Products Listed", value: 1 },
    { icon: starIcon.src, label: "Response Rate", value: `${96}%` },
  ]);
  return (
    <SharedAnalyticCard details={storeHealthDetails} header={"Store Health"} />
  );
};

export default StoreHealthSection;
