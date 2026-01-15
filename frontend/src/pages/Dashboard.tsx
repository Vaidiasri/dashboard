import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import Sidebar from "../components/dashboard/Sidebar";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";
import { useAnalytics } from "../hooks/useAnalytics";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const DashBoard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    filters,
    setFilters,
    data,
    selectedFeature,
    handleBarClick,
    processedLineData,
  } = useAnalytics();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* 1. SIDEBAR */}
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="font-semibold tracking-wide text-lg sm:text-xl">
              Product Dashboard
            </h1>
          </div>

          {/* Headless UI Menu Profile */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-zinc-700 transition">
              <span className="text-xs sm:text-sm">My Account</span>
            </MenuButton>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <MenuItems className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1 z-50">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? "bg-blue-600" : ""
                      } flex w-full p-2 rounded text-sm`}
                    >
                      Logout
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnalyticsCharts
            data={data}
            processedLineData={processedLineData}
            selectedFeature={selectedFeature}
            onBarClick={handleBarClick}
          />
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
