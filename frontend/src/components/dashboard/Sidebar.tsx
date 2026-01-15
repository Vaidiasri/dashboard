import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import DateFilters from "./DateFilters";
import DemographicsFilters from "./DemographicsFilters";
import type { DashboardFilters, SidebarProps } from "../../types/dashboard";

const Sidebar = ({ filters, setFilters }: SidebarProps) => {
  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="w-72 border-r border-zinc-800 p-6 hidden md:block bg-zinc-950">
      <h2 className="text-xl font-bold mb-8 text-blue-500">Analytics Panel</h2>

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
          <TabPanel>
            <DateFilters
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDateChange={handleFilterChange}
            />
          </TabPanel>

          {/* Demographics Panel */}
          <TabPanel>
            <DemographicsFilters
              ageGroup={filters.ageGroup}
              gender={filters.gender}
              onFilterChange={handleFilterChange}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Sidebar;
