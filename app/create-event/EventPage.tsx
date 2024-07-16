"use client";

import React, { useState } from "react";
import CreateEventForm from "./_components/CreateEventForm";
import TicketForm from "./_components/TicketForm";
import { FormProvider, useForm } from "react-hook-form";
import CreateTicketForm from "./_components/CreateTicketForm";

import { inngest } from "@/inngest";
import { event } from "@prisma/client";
import { uploadImageToFirebase } from "@/config/upload-media";
import { useUser } from "@clerk/nextjs";

interface UploadedImage {
  file: File;
  type: string;
}
const EventPage = () => {
  const methods = useForm<event>();
  const [currentStep, setCurrentStep] = useState(0);
  const user = useUser();

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const steps = [
    {
      label: "Create Event",
      component: (
        <CreateEventForm
          setUploadedImages={setUploadedImages}
          uploadedImages={uploadedImages}
        />
      ),
    },
    {
      label: "Ticket",
      component: (
        <CreateTicketForm
          setUploadedImages={setUploadedImages}
          uploadedImages={uploadedImages}
        />
      ),
    },
    // Add your feedback form step here when available
  ];

  const onSubmit = async (data: event) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(data);
      try {
        const imageUploads = uploadedImages.map(async (imageObj) => {
          const url = await uploadImageToFirebase(imageObj.file, "images");
          return { type: imageObj.type, url };
        });

        const uploadedUrls = await Promise.all(imageUploads);

        console.log(uploadedUrls);

        const updatedData = { ...data };
        uploadedUrls.forEach((upload) => {
          if (upload.type === "eventImages")
            updatedData.eventImage = upload.url;
          if (upload.type === "eventLogos") updatedData.eventLogo = upload.url;
          if (upload.type === "ticketImages")
            updatedData.ticketImage = upload.url;
        });
        updatedData.userId = user.user?.id ?? null;

        const response = await fetch("/api/eventss", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Failed to create event");
        }

        const result = await response.json();
        console.log("Event created:", result);
      } catch (error) {
        console.error("Error uploading images or sending data:", error);
      }
    }
  };

  //   try {
  //     const urls = await Promise.all(
  //       uploadedImages.map(({ file }) => uploadmediatofirebase(file))
  //     );
  //     console.log("All image URLs:", urls);
  //     // Proceed with the final form submission with image URLs included
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //   }
  //   console.log(data);

  //   { label: "Feedback", component: <FeedbackForm /> },]
  return (
    <FormProvider {...methods}>
      <main className=" gap-8 my-5 min-h-screen  bg-[#F5F4F4] shadow-md rounded-md border border-black mx-20  p-8  ">
        <div className="flex justify-center gap-4 mb-5">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-2xl ${
                index === currentStep ? "bg-primary text-white" : "bg-secondary"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {step.label}
            </button>
          ))}
        </div>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mb-5">
          {steps[currentStep].component}

          {/* <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded"
              >
                {currentStep < steps.length - 1 ? "Next" : "Submit"}
              </button>
            )}
          </div> */}

          <div className="flex justify-between mt-5">
            {currentStep > 0 && (
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {currentStep < steps.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </form>
      </main>
    </FormProvider>
  );
};

export default EventPage;
