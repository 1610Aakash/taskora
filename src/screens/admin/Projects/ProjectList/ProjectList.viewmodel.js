"use client";

import { useState, useEffect, useMemo } from "react";
import { getProjectsRequest } from "./ProjectList.model";

export function useAdminProjectListViewModel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    getProjectsRequest().then((data) => {
      if (!cancelled) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.status === filter),
    [projects, filter],
  );

  return { projects: filtered, loading, filter, setFilter };
}
