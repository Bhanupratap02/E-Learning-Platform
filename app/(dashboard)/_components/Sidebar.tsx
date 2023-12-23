/** @format */

import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";
export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex items-center  py-4 px-7 gap-2 border-b">
        <Logo />
        <p className="text-medium font-bold text-sky-500">E-Learning</p>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
