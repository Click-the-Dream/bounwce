"use client";
import productImg from "../../../../assets/product-image.svg";
import { IoMdAdd } from "react-icons/io";
import ActionButton from "./ActionButton";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
import Modal from "@/app/_components/Modal";

const NoProductCard = ({ title, subtext }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-white  rounded-[12.75px]">
      <div className="flex flex-col justify-center items-center gap-2 py-7.5">
        <img src={productImg} width={60} />
        <h1 className="text-[14px] font-semibold">{title}</h1>
        <p className="text-[13px]">{subtext}</p>
      </div>

      <div className="p-3">
        <ActionButton
          label={"Add Your Product"}
          icon={IoMdAdd}
          className="bg-black text-white"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddProductForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default NoProductCard;
