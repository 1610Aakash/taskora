"use client";

import { useState, useEffect } from "react";
import { getProjectDetailsRequest } from "./ProjectDetails.model";

export function useAdminProjectDetailsViewModel(projectId) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProjectDetailsRequest(projectId)
      .then((data) => {
        if (cancelled) return;
        setProject(data.project);
        setTasks(data.tasks);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { project, tasks, loading, error };
}
