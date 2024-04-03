import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full min-h-screen h-auto flex justify-center items-center bg-background">
      <div className="w-9/10 min-h-9/10 h-auto my-8 rounded-large bg-white rounded-2xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
