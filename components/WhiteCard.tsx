import React from "react";

const WhiteCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-evenly w-full h-fit min-h-[500px] m-auto p-3 rounded-lg bg-white lg:w-[89%] lg:p-5">
      {children}
    </div>
  );
};

export default WhiteCard;
