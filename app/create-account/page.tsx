import React from "react";
import { CreateOrgAccount } from "../_components/createOrgAccount";
import Image from "next/image";
import orgHero from "../../public/images/orghero.svg";
import { Odor_Mean_Chey } from "next/font/google";

const CreateAccount = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-[50%] h-fit rounded-3xl">
        <Image src={orgHero} width={900} height={300} alt={""} />
      </div>
      <div className="w-[50%]  rounded-3xl">
        <CreateOrgAccount />
      </div>
    </div>
  );
};

export default CreateAccount;
