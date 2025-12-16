import { productImg } from "../../../assets";
import { IoMdAdd } from "react-icons/io";
import ActionButton from "./ActionButton";
import { useState } from "react";
import Modal from "./Modal";
import AddProductPage from "../pages/AddProductPage";

const NoProductCard = ({ title, subtext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-white  rounded-[12.75px]">
      <div className="flex flex-col justify-center items-center gap-2 py-[30px]">
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
        <AddProductPage onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default NoProductCard;
