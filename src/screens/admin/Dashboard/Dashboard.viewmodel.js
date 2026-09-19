"use client";

import { useState, useEffect } from "react";
import { getAdminDashboardDataRequest } from "./Dashboard.model";

export function useAdminDashboardViewModel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAdminDashboardDataRequest().then((res) => {
      if (!cancelled) {
        setData(res);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}
