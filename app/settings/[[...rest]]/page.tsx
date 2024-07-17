import { UserProfile } from "@clerk/nextjs";
import React from "react";

const UserSettings= () => {
  return (
    <div className=" mx-auto flex justify-center items-center">
      <UserProfile />
    </div>
  );
};

export default UserSettings;