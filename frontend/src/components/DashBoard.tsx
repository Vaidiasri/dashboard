import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
  Tab,
  TabGroup,
  TabList,
  TabPanels,
  TabPanel,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const DashBoard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["dashboardFilters"]);

  // States for Analytics
  // Helper for dynamic definition of default dates (current month)
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const defaultFilters = {
    startDate: firstDay,
    endDate: lastDay,
    ageGroup: "",
    gender: "",
  };

  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...(cookies.dashboardFilters || {}),
  });
  const [data, setData] = useState({ barData: [], lineData: [] });

  // Data fetch logic
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/track/analytics", {
        params: filters,
      });
      setData({ barData: res.data.bar_data, lineData: res.data.line_data });
      setCookie("dashboardFilters", filters, { path: "/" });
    };
    fetchData();
  }, [filters]);

  // Debugging data to avoid unused variable error
  useEffect(() => {
    console.log("Dashboard Data:", data);
  }, [data]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* 1. SIDEBAR with Headless UI Tabs */}
      <div className="w-72 border-r border-zinc-800 p-6 hidden md:block bg-zinc-950">
        <h2 className="text-xl font-bold mb-8 text-blue-500">
          Analytics Panel
        </h2>

        <TabGroup>
          <TabList className="flex flex-col gap-2">
            <Tab
              className={({ selected }) =>
                `w-full text-left px-4 py-2 rounded-lg outline-none transition ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900"
                }`
              }
            >
              Date Filters
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full text-left px-4 py-2 rounded-lg outline-none transition ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900"
                }`
              }
            >
              User Demographics
            </Tab>
          </TabList>

          <TabPanels className="mt-6">
            {/* Date Panel */}
            <TabPanel className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-500">Start Date</label>
                <input
                  type="date"
                  className="bg-zinc-900 p-2 rounded border border-zinc-800 text-sm"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                />

                <label className="text-xs text-zinc-500">End Date</label>
                <input
                  type="date"
                  className="bg-zinc-900 p-2 rounded border border-zinc-800 text-sm"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                />
              </div>
            </TabPanel>

            {/* Demographics Panel */}
            <TabPanel className="space-y-4">
              <select
                className="w-full bg-zinc-900 p-2 rounded border border-zinc-800 text-sm"
                value={filters.ageGroup}
                onChange={(e) =>
                  setFilters({ ...filters, ageGroup: e.target.value })
                }
              >
                <option value="">Select Age Group</option>
                <option value="<18">&lt; 18</option>
                <option value="18-40">18 - 40</option>
                <option value=">40">&gt; 40</option>
              </select>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>

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
              <MenuItems className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl p-1">
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
          {/* Yahan hum charts insert karenge Recharts ke */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
              Bar Chart (Placeholder)
            </div>
            <div className="h-80 bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
              Line Chart (Placeholder)
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
