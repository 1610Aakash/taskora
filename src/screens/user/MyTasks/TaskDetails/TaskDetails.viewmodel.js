"use client";

import { useState, useEffect } from "react";
import { TASK_STATUS_FLOW } from "@/lib/constants/status";
import {
  getTaskDetailsRequest,
  updateTaskStatusRequest,
} from "./TaskDetails.model";

export function useTaskDetailsViewModel(taskId) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getTaskDetailsRequest(taskId)
      .then((data) => !cancelled && setTask(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [taskId]);

  const nextStatus = task
    ? TASK_STATUS_FLOW[TASK_STATUS_FLOW.indexOf(task.status) + 1]
    : null;

  const advanceStatus = async () => {
    if (!nextStatus) return;
    setUpdating(true);
    try {
      await updateTaskStatusRequest(taskId, nextStatus);
      setTask((t) => ({ ...t, status: nextStatus }));
    } finally {
      setUpdating(false);
    }
  };

  return { task, loading, error, updating, nextStatus, advanceStatus };
}
