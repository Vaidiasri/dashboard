export interface DashboardFilters {
  startDate: string;
  endDate: string;
  ageGroup: string;
  gender: string;
}

export interface BarDataItem {
  feature: string;
  clicks: number;
}

export interface LineDataItem {
  name: string;
  value: number;
}

export interface RawLineDataItem {
  date: string;
  feature: string;
  clicks: number;
}

export interface AnalyticsData {
  barData: BarDataItem[];
  lineData: RawLineDataItem[];
}

export interface DateFiltersProps {
  startDate: string;
  endDate: string;
  onDateChange: (type: "startDate" | "endDate", value: string) => void;
}

export interface DemographicsFiltersProps {
  ageGroup: string;
  gender: string;
  onFilterChange: (type: "ageGroup" | "gender", value: string) => void;
}

export interface SidebarProps {
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export interface AnalyticsChartsProps {
  data: AnalyticsData;
  processedLineData: LineDataItem[];
  selectedFeature: string | null;
  onBarClick: (payload: any) => void;
}
