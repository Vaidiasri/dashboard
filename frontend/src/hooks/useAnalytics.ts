import { useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "../api/axios";
import type { DashboardFilters, AnalyticsData, LineDataItem, RawLineDataItem } from "../types/dashboard";
import { COOKIE_KEYS } from "../constants";

export const useAnalytics = () => {
  const [cookies, setCookie] = useCookies([COOKIE_KEYS.DASHBOARD_FILTERS]);

  // Default dates helper
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const defaultFilters: DashboardFilters = {
    startDate: firstDay,
    endDate: lastDay,
    ageGroup: "",
    gender: "",
  };

  const [filters, setFilters] = useState<DashboardFilters>({
    ...defaultFilters,
    ...(cookies.dashboardFilters || {}),
  });

  const [data, setData] = useState<AnalyticsData>({ barData: [], lineData: [] });
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  // Data fetch logic
  useEffect(() => {
    const fetchData = async () => {
      // Clean filters
      const params: any = { ...filters };
      if (!params.ageGroup) delete params.ageGroup;
      if (!params.gender) delete params.gender;
      
      // Ensure dates are present
      if (!params.startDate) params.startDate = firstDay;
      if (!params.endDate) params.endDate = lastDay;

      try {
        const res = await axiosInstance.get("/track/analytics", {
          params,
        });
        setData({ barData: res.data.bar_data, lineData: res.data.line_data });
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
      setCookie(COOKIE_KEYS.DASHBOARD_FILTERS, filters, { path: "/" });
    };

    // Debounce API calls by 500ms
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, setCookie]);

  const handleBarClick = async (payload: any) => {
    if (!payload || !payload.activePayload) return;

    const featureName = payload.activePayload[0].payload.feature; // Access 'feature' prop not 'name'
    setSelectedFeature(featureName);

    try {
      await axiosInstance.post("/track/", { feature_name: featureName });
      console.log(`Tracked click for: ${featureName}`);
    } catch (err) {
      console.error("Tracking call failed", err);
    }
  };

  // Derived state for Line Chart - Memoized for performance
  const processedLineData: LineDataItem[] = useMemo(() => {
    if (!data.lineData || data.lineData.length === 0) return [];

    if (selectedFeature) {
      // Filter by selected feature
      return data.lineData
        .filter((item: RawLineDataItem) => item.feature === selectedFeature)
        .map((item: RawLineDataItem) => ({
          name: item.date,
          value: item.clicks,
        }));
    } else {
      // Aggregate all features by date
      const aggregated: Record<string, number> = {};
      data.lineData.forEach((item: RawLineDataItem) => {
        if (aggregated[item.date]) {
          aggregated[item.date] += item.clicks;
        } else {
          aggregated[item.date] = item.clicks;
        }
      });
      return Object.keys(aggregated)
        .map((date) => ({
          name: date,
          value: aggregated[date],
        }))
        .sort(
          (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
        );
    }
  }, [data.lineData, selectedFeature]);

  return {
    filters,
    setFilters,
    data,
    selectedFeature,
    handleBarClick,
    processedLineData,
  };
};
