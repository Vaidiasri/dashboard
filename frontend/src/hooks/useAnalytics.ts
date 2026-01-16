import { useState, useEffect, useMemo, useRef, useCallback } from "react";
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

  // Data fetch logic extracted for reuse (The Elite Way)
  const fetchAnalytics = useCallback(async (isTracking = false, ensureToday = false) => {
    // Clean filters
    const params: any = { ...filters };
    if (!params.ageGroup) delete params.ageGroup;
    if (!params.gender) delete params.gender;
    
    // Ensure dates are present
    if (!params.startDate) params.startDate = firstDay;
    if (!params.endDate) params.endDate = lastDay;

    // SMART FIX: If interacting, ensure we fetch up to TODAY so the user sees their new data
    if (ensureToday) {
       const todayStr = new Date().toISOString().split("T")[0];
       if (params.endDate < todayStr) {
         params.endDate = todayStr;
         params.endDate = todayStr;
       }
    }

    // CACHE BUSTER: Add timestamp to prevent browser caching of GET requests
    // This is crucial for verifying "Read-After-Write" 
    const finalParams = { ...params, _t: Date.now() };

    try {
      const res = await axiosInstance.get("/track/analytics", {
        params: finalParams,
      });

      setData({ barData: res.data.bar_data, lineData: res.data.line_data });

      // Track filter change (only if specified and not skipped)
      if (isTracking) {
         await axiosInstance.post("/track/", { feature_name: "Filter Interaction" });
      }

    } catch (err) {
      console.error("Failed to fetch analytics or track", err);
    }
  }, [filters, firstDay, lastDay]);


  // Effect for Filters (Debounced)
  const isFirstRun = useRef(true);
  
  useEffect(() => {
    // Save cookies on filter change
    setCookie(COOKIE_KEYS.DASHBOARD_FILTERS, filters, { path: "/" });

    const timer = setTimeout(() => {
      // Logic: If it's NOT the first run, we want to track this as a filter interaction
      if (isFirstRun.current) {
        isFirstRun.current = false;
        fetchAnalytics(false); // Just fetch, don't track initial load
      } else {
        fetchAnalytics(true); // Fetch AND track filter change
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, fetchAnalytics, setCookie]);

  // Throttling helper for clicks
  const throttleTimeout = useRef<unknown>(null);

  const handleBarClick = async (payload: any) => {
    if (!payload || !payload.feature) return;

    const featureName = payload.feature;
    // 1. Immediate UI Update
    setSelectedFeature(featureName);

    // 2. Throttled Backend Call & Re-fetch
    if (!throttleTimeout.current) {
      // Set lock immediately
      throttleTimeout.current = setTimeout(() => {
        throttleTimeout.current = null;
      }, 2000);

      // SMART OPTIMISTIC LOGIC:
      // If demographic filters (Age/Gender) are active, we CANNOT guarantee the user matches them.
      // So we DISABLE optimistic updates to prevent "Revert/Flicker" (User Request).
      const hasDemographics = filters.ageGroup || filters.gender;

      if (!hasDemographics) {
        // Safe to update optimistically
        setData((prev) => {
          const newBarData = prev.barData.map((item) =>
            item.feature === featureName
              ? { ...item, clicks: item.clicks + 1 }
              : item
          );
          return { ...prev, barData: newBarData };
        });
      } else {
        // console.log("Optimistic update skipped due to active demographic filters (Safe Mode).");
      }

      try {
        await axiosInstance.post("/track/", { feature_name: featureName });
        
        // Increased delay to ensure AWS/Cloud DB consistency (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));

        // Re-fetch data to ensure server sync
        
        // SMART FETCH: Ensure we fetch up to TODAY so the new DB record is included!
        await fetchAnalytics(false, true); 
        
      } catch (err) {
        console.error("Tracking call failed", err);
        // Rollback could be implemented here if needed, but for analytics it's usually fine
      }
    } else {
      // console.log(`Tracking throttled for: ${featureName}`);
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
