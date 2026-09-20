"use client";

import { useState, useEffect } from "react";
import { getUsersRequest } from "./UserList.model";

export function useUserListViewModel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      setLoading(true);
      getUsersRequest({ status: statusFilter, search }).then((data) => {
        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      });
    }, 300); // debounce while typing

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [statusFilter, search]);

  return { users, loading, search, setSearch, statusFilter, setStatusFilter };
}
