"use client";

import { useState, useEffect } from "react";
import { getProjectDetailsRequest } from "./ProjectDetails.model";

export function useProjectDetailsViewModel(projectId) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => getProjectDetailsRequest(projectId)
      .then((data) => {
        if (cancelled) return;
        setProject(data.project);
        setTasks(data.tasks);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false)), 0);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [projectId]);

  return { project, tasks, loading, error };
}
