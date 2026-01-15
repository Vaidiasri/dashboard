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

const DashBoard = () => {
  const navigate = useNavigate();
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
      <Sidebar filters={filters} setFilters={setFilters} />

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-900/50">
          <h1 className="font-semibold tracking-wide">Product Dashboard</h1>

          {/* Headless UI Menu Profile */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-700 transition">
              <span className="text-sm">My Account</span>
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

        <main className="flex-1 overflow-y-auto p-6">
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
