"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const TicketCancel = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        Payment Cancelled
      </h1>
      <p className="text-lg mb-8">
        Your payment was cancelled. Please try again if you wish to book a
        ticket.
      </p>
      <Button
        onClick={handleHomeClick}
        className="text-white px-6 py-3 rounded-lg shadow-md "
      >
        Go to Home
      </Button>
    </div>
  );
};

export default TicketCancel;
