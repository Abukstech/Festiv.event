"use client"
import React, { useState } from "react";
import TicketPurchaseModal from "../_comps/TicketImage";

interface TicketButtonProps {
  price: string;
}

const TicketButton: React.FC<TicketButtonProps> = ({ price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="mt-2 bg-white text-[#022543] text-2xl border-2 border-[#022543] w-full py-1 px-3 rounded-[30px]"
      >
        Book Ticket - ${price}
      </button>
      <TicketPurchaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        price={price}
      />
    </>
  );
};

export default TicketButton;
