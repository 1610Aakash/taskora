"use client";

import { useState, useEffect, useMemo } from "react";
import { getUsersRequest } from "./UserList.model";

export function useUserListViewModel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    getUsersRequest().then((data) => {
      if (!cancelled) {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      const matchesSearch =
        !search ||
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [users, search, statusFilter]);

  return {
    users: filtered,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  };
}
