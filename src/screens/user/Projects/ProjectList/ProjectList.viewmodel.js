"use client";

import { useState, useEffect, useMemo } from "react";
import { getProjectsRequest } from "./ProjectList.model";

export function useProjectListViewModel() {
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

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  return { projects: filtered, loading, filter, setFilter };
}
