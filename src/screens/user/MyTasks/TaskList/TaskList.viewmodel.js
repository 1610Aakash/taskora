"use client";

import { useState, useEffect, useMemo } from "react";
import { getMyTasksRequest } from "./TaskList.model";

export function useTaskListViewModel() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    getMyTasksRequest().then((data) => {
      if (!cancelled) {
        setTasks(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);

  return { tasks: filtered, loading, filter, setFilter };
}
