"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TicketSuccess = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg mb-8">
        Thank you for your purchase. Your ticket has been successfully booked.
      </p>
      <Button
        onClick={handleHomeClick}
        className="bg-primary text-white px-6 py-3 rounded-lg shadow-md "
      >
        Go to Home
      </Button>
    </div>
  );
};

export default TicketSuccess;
