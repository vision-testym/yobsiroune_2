import React from "react";

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-12 lg:p-14">
      {children}
    </main>
  );
};

export default MainWrapper;
