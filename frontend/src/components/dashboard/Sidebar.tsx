import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DateFilters from "./DateFilters";
import DemographicsFilters from "./DemographicsFilters";
import type { DashboardFilters, SidebarProps } from "../../types/dashboard";

const Sidebar = ({
  filters,
  setFilters,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) => {
  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // Reusable Content Component
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-blue-500">Analytics Dashboard</h2>
        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

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

        <TabPanels className="mt-6 flex-1 overflow-y-auto">
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

  return (
    <>
      {/* DESKTOP SIDEBAR (Static) */}
      <div className="w-72 border-r border-zinc-800 p-6 hidden md:block bg-zinc-950">
        <SidebarContent />
      </div>

      {/* MOBILE SIDEBAR (Drawer) */}
      <Transition show={mobileOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setMobileOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="w-full bg-zinc-950 p-6 shadow-2xl ring-1 ring-white/10">
                  <SidebarContent />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Sidebar;
