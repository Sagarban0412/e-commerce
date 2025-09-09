import React from "react";
import { AppSidebar } from "@/components/Sidebar";

const Page = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1">
          <AppSidebar />
        </div>
        <div className="pl-10">this is admin page</div>
      </div>
    </>
  );
};

export default Page;
