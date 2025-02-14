"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { inngest } from "@/inngest";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

interface FormValues {
  organizationName: string;
  address: string;
  state: string;
  country: string;
  mainPhone: string;
  services: string[];
  aboutOrganization: string;
  socialMedia: { platform: string; link: string }[];
}

export const CreateOrgAccount: React.FC = () => {
  const { register, handleSubmit, reset, control } = useForm<FormValues>();
  const [services, setServices] = useState<string[]>([]);
  const [socialMedia, setSocialMedia] = useState<
    { platform: string; link: string }[]
  >([]);
  const [newService, setNewService] = useState<string>("");

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.services = services;

    console.log("Form submitted successfully:", data);

    try {
      const response = await fetch("/api/org-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      toast({
        title: "Success: Great work!",
        description: "You will be redirected shortly ",
      });
    } catch (error) {
      console.error("Error Create Account ", error);

      toast({
        title: "Error",
        description: "Error Creating Account",
      });
    }

    // Sync user data with Inngest

    reset();
    setServices([]);
    setSocialMedia([]);

    router.push("/portal");
  };

  const handleAddService = () => {
    if (newService.trim() !== "") {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-secondary w-[50] p-4 rounded-3xl"
    >
      <div>
        <label>Organization Name:</label>
        <input
          className="block border p-2"
          type="text"
          {...register("organizationName")}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          className="block border p-2"
          type="text"
          {...register("address")}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          className="block border p-2"
          type="text"
          {...register("state")}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          className="block border p-2"
          type="text"
          {...register("country")}
        />
      </div>

      <div>
        <label>Main Phone:</label>
        <input
          className="block border p-2"
          type="text"
          {...register("mainPhone")}
        />
      </div>
      <div>
        <label>Type of services you render:</label>
        <div>
          <input
            className="block border p-2"
            type="text"
            value={newService}
            {...register("services")}
            onChange={(e) => setNewService(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddService();
              }
            }}
          />
          <Button type="button" className="nt-4" onClick={handleAddService}>
            Add Service
          </Button>
        </div>
        <div className="mt-3 flex flex-row">
          {services.map((service, index) => (
            <span
              key={index}
              className="border rounded-sm bg-primary py-2 px-4 text-secondary hover:bg-secondary hover:text-primary  text-base transition-opacity"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      <div>
        <label>About your organization:</label>
        <textarea
          className="block border p-2"
          {...register("aboutOrganization")}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm md:text-xl text-primary font-medium mb-1">
          Social Media Links:
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-4 items-end mb-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Platform:
              </label>
              <select
                {...register(`socialMedia.${index}.platform`)}
                defaultValue={field.platform}
                className="p-2 border rounded-md"
              >
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL:</label>
              <input
                type="url"
                {...register(`socialMedia.${index}.link`)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ platform: "", link: "" })}
          className="px-4 py-2 mb-4 bg-primary text-white rounded-md"
        >
          +
        </button>
      </div>
      <Button className="w-full" type="submit">
        Create Account
      </Button>
    </form>
  );
};
