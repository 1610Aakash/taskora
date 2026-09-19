"use client";

import { useState, useEffect } from "react";
import { getDashboardDataRequest } from "./Dashboard.model";

export function useDashboardViewModel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getDashboardDataRequest().then((res) => {
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
