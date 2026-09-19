"use client";

import { useState, useEffect } from "react";
import { getTaskRequest, updateTaskStatusRequest } from "./TaskDetails.model";

export function useAdminTaskDetailsViewModel(taskId) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    getTaskRequest(taskId)
      .then((data) => !cancelled && setTask(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [taskId]);

  const onStatusChange = async (status) => {
    setUpdating(true);
    try {
      const updated = await updateTaskStatusRequest(taskId, status);
      setTask(updated);
    } finally {
      setUpdating(false);
    }
  };

  return { task, loading, error, updating, onStatusChange };
}
