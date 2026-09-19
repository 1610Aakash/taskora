"use client";

import { useState, useEffect, useMemo } from "react";
import { getAllTasksRequest } from "./TaskList.model";

export function useAdminTaskListViewModel() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    getAllTasksRequest().then((data) => {
      if (!cancelled) {
        setTasks(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((t) => t.status === filter)),
    [tasks, filter],
  );

  return { tasks: filtered, loading, filter, setFilter };
}
