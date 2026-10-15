"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { PRIORITY_OPTIONS } from "@/lib/constants/options";
import {
  generateTaskBreakdownRequest,
  getBreakdownOptionsRequest,
  saveGeneratedTasksRequest,
} from "../ProjectDetails.model";

const TASK_COUNTS = [5, 6, 7, 8, 9, 10, 11, 12];

function toDateInputValue(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

export default function AiTaskBreakdownDialog({
  open,
  onClose,
  project,
  onSaved,
}) {
  const dialogRef = useRef(null);
  const [instructions, setInstructions] = useState("");
  const [taskCount, setTaskCount] = useState(8);
  const [maxTaskCount, setMaxTaskCount] = useState(12);
  const [users, setUsers] = useState([]);
  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const [retryingOptions, setRetryingOptions] = useState(false);
  const [optionsError, setOptionsError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [generationError, setGenerationError] = useState("");
  const [savingError, setSavingError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open || optionsLoaded) return undefined;

    let cancelled = false;
    getBreakdownOptionsRequest()
      .then(({ maxTaskCount: countLimit, users: availableUsers }) => {
        if (cancelled) return;
        setMaxTaskCount(countLimit);
        setTaskCount((current) => Math.min(current, countLimit));
        setUsers(availableUsers);
        setOptionsLoaded(true);
      })
      .catch((err) => {
        if (!cancelled) setOptionsError(err.message);
      })
      .finally(() => {
        if (!cancelled) setRetryingOptions(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, optionsLoaded]);

  const loadingOptions =
    retryingOptions || (open && !optionsLoaded && !optionsError);

  const retryLoadingOptions = async () => {
    setRetryingOptions(true);
    setOptionsError("");
    try {
      const { maxTaskCount: countLimit, users: availableUsers } =
        await getBreakdownOptionsRequest();
      setMaxTaskCount(countLimit);
      setTaskCount((current) => Math.min(current, countLimit));
      setUsers(availableUsers);
      setOptionsLoaded(true);
    } catch (err) {
      setOptionsError(err.message);
    } finally {
      setRetryingOptions(false);
    }
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    setGenerationError("");
    setSavingError("");
    setSaveMessage("");
    setGenerating(true);

    try {
      const { tasks } = await generateTaskBreakdownRequest({
        projectId: project.id,
        instructions,
        taskCount,
      });
      const generatedAt = Date.now();
      setSuggestions(
        tasks.map((task, index) => ({
          ...task,
          id: `${generatedAt}-${index}`,
          selected: true,
          assignedUserId: "",
        })),
      );
    } catch (err) {
      setGenerationError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const updateSuggestion = (id, changes) => {
    setSuggestions((current) =>
      current.map((task) => (task.id === id ? { ...task, ...changes } : task)),
    );
  };

  const handleSave = async () => {
    setSavingError("");
    setSaveMessage("");
    const selected = suggestions.filter((task) => task.selected);
    if (selected.length === 0) {
      setSavingError("Select at least one task to save.");
      return;
    }
    if (selected.some((task) => !task.assignedUserId)) {
      setSavingError("Choose an assignee for every selected task.");
      return;
    }
    if (
      selected.some(
        (task) =>
          task.title.trim().length < 3 ||
          task.title.trim().length > 120 ||
          task.description.trim().length > 1600 ||
          !/^\d{4}-\d{2}-\d{2}$/.test(task.suggestedDueDate) ||
          !PRIORITY_OPTIONS.some((option) => option.value === task.priority),
      )
    ) {
      setSavingError("Review the selected tasks; one or more fields are invalid.");
      return;
    }

    setSaving(true);
    try {
      const result = await saveGeneratedTasksRequest({
        projectId: project.id,
        tasks: selected.map((task) => ({
          name: task.title.trim(),
          description: task.description.trim(),
          priority: task.priority,
          dueDate: task.suggestedDueDate,
          assignedUserId: task.assignedUserId,
        })),
      });

      const failedIds = new Set(
        result.failed.map((failure) => selected[failure.index]?.id),
      );
      const missedNotifications = result.created.filter(
        (createdTask) => !createdTask.notificationSent,
      ).length;
      let refreshFailed = false;

      if (result.created.length > 0) {
        try {
          await onSaved();
        } catch {
          refreshFailed = true;
        }
      }

      if (result.failed.length > 0) {
        setSuggestions((current) =>
          current
            .filter((task) => failedIds.has(task.id))
            .map((task) => ({ ...task, selected: true })),
        );
        setSaveMessage(
          `${result.created.length} task${result.created.length === 1 ? "" : "s"} created. You can retry the remaining ${result.failed.length}.`,
        );
        const notices = [
          `${result.failed.length} task${result.failed.length === 1 ? "" : "s"} could not be created. Please retry.`,
        ];
        if (missedNotifications > 0) {
          notices.push(
            `${missedNotifications} assignment notification${missedNotifications === 1 ? "" : "s"} could not be sent.`,
          );
        }
        if (refreshFailed) {
          notices.push("Reload this page to refresh the project task list.");
        }
        setSavingError(notices.join(" "));
      } else {
        setSaveMessage(
          `${result.created.length} task${result.created.length === 1 ? "" : "s"} created successfully.`,
        );
        setSuggestions([]);
        const notices = [];
        if (missedNotifications > 0) {
          notices.push(
            `${missedNotifications} assignment notification${missedNotifications === 1 ? "" : "s"} could not be sent.`,
          );
        }
        if (refreshFailed) {
          notices.push("Reload this page to refresh the project task list.");
        }
        setSavingError(notices.join(" "));
      }
    } catch (err) {
      setSavingError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const selectedCount = suggestions.filter((task) => task.selected).length;
  const deadline = toDateInputValue(project.dueDate);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="ai-breakdown-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!generating && !saving) onClose();
      }}
      className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/35 backdrop:backdrop-blur-[1px]"
    >
      <div className="flex max-h-[92vh] flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-4 w-4" />
              AI task planner
            </div>
            <h2 id="ai-breakdown-title" className="text-lg font-bold">
              Break down {project.name}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Review each suggestion and choose an assignee before saving.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={generating || saving}
            aria-label="Close AI task breakdown"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="overflow-y-auto p-5 sm:p-6">
          <div className="rounded-xl border border-border bg-background/70 p-4">
            <h3 className="text-sm font-semibold text-foreground">
              {project.name}
            </h3>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-muted">
              {project.description || "No project description has been added."}
            </p>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              <CalendarDays className="h-3.5 w-3.5" />
              Project deadline:{" "}
              {new Date(project.dueDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <form onSubmit={handleGenerate} className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">
                Additional instructions <span className="text-muted">(optional)</span>
              </span>
              <textarea
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                maxLength={2000}
                rows={3}
                placeholder="For example, focus first on the core user flow and include testing tasks."
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              <span className="mt-1 block text-right text-xs text-muted">
                {instructions.length}/2000
              </span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="block w-full sm:max-w-xs">
                <span className="mb-1.5 block text-sm font-medium">
                  Number of tasks
                </span>
                <select
                  value={taskCount}
                  onChange={(event) => setTaskCount(Number(event.target.value))}
                  disabled={generating || loadingOptions}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  {TASK_COUNTS.filter((count) => count <= maxTaskCount).map(
                    (count) => (
                      <option key={count} value={count}>
                        {count} tasks
                      </option>
                    ),
                  )}
                </select>
              </label>
              <Button
                type="submit"
                loading={generating}
                disabled={loadingOptions || Boolean(optionsError)}
                className="w-full sm:w-auto"
              >
                {suggestions.length > 0 ? (
                  <>
                    {!generating && <RefreshCw className="h-4 w-4" />}
                    Regenerate suggestions
                  </>
                ) : (
                  "Generate breakdown"
                )}
              </Button>
            </div>
          </form>

          {loadingOptions && (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading active team members…
            </p>
          )}
          {optionsError && (
            <div role="alert" className="mt-4 flex items-center justify-between gap-3 text-sm text-danger">
              <span>{optionsError}</span>
              <button
                type="button"
                onClick={retryLoadingOptions}
                disabled={retryingOptions}
                className="shrink-0 rounded-md px-2 py-1 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}
          {!loadingOptions && !optionsError && users.length === 0 && (
            <p className="mt-4 text-sm text-warning">
              No user accounts are available to assign these tasks.
            </p>
          )}
          {generationError && (
            <p
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {generationError}
            </p>
          )}

          {generating && (
            <div
              role="status"
              className="mt-5 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted"
            >
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Creating task suggestions…
            </div>
          )}

          {suggestions.length > 0 && (
            <section className="mt-6" aria-label="Suggested tasks">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">Review suggestions</h3>
                  <p className="mt-1 text-xs text-muted">
                    {selectedCount} of {suggestions.length} selected
                  </p>
                </div>
                <p className="text-xs text-primary">
                  AI-generated suggestions — review before saving
                </p>
              </div>

              <div className="space-y-3">
                {suggestions.map((task, index) => (
                  <article
                    key={task.id}
                    className={`rounded-xl border p-4 transition-colors ${
                      task.selected
                        ? "border-primary/30 bg-background/70"
                        : "border-border bg-background/30 opacity-70"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.selected}
                        onChange={(event) =>
                          updateSuggestion(task.id, {
                            selected: event.target.checked,
                          })
                        }
                        aria-label={`Select task ${index + 1}`}
                        className="mt-1 h-4 w-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <div className="min-w-0 flex-1 space-y-3">
                        <label className="block">
                          <span className="sr-only">{`Task ${index + 1} title`}</span>
                          <input
                            aria-label={`Task ${index + 1} title`}
                            value={task.title}
                            maxLength={120}
                            onChange={(event) =>
                              updateSuggestion(task.id, {
                                title: event.target.value,
                              })
                            }
                            disabled={!task.selected}
                            className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-foreground outline-none focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 disabled:opacity-70"
                          />
                        </label>
                        <label className="block">
                          <span className="sr-only">{`Task ${index + 1} description`}</span>
                          <textarea
                            aria-label={`Task ${index + 1} description`}
                            value={task.description}
                            maxLength={1600}
                            rows={2}
                            onChange={(event) =>
                              updateSuggestion(task.id, {
                                description: event.target.value,
                              })
                            }
                            disabled={!task.selected}
                            className="w-full resize-y rounded-md border border-border bg-card px-3 py-2 text-sm leading-5 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-70"
                          />
                        </label>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1 block text-xs font-medium text-muted">
                              Priority
                            </span>
                            <select
                              value={task.priority}
                              onChange={(event) =>
                                updateSuggestion(task.id, {
                                  priority: event.target.value,
                                })
                              }
                              disabled={!task.selected}
                              className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                              {PRIORITY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-1 block text-xs font-medium text-muted">
                              Assign to
                            </span>
                            <select
                              value={task.assignedUserId}
                              onChange={(event) =>
                                updateSuggestion(task.id, {
                                  assignedUserId: event.target.value,
                                })
                              }
                              disabled={!task.selected || loadingOptions}
                              className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                              <option value="">Choose a team member</option>
                              {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                  {user.status === "inactive"
                                    ? " (Inactive)"
                                    : ""}
                                  {user.role === "admin" ? " (Admin)" : ""}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-1 flex items-center gap-1 text-xs font-medium text-muted">
                              <CalendarDays className="h-3.5 w-3.5" />
                              Suggested deadline
                            </span>
                            <input
                              type="date"
                              value={task.suggestedDueDate}
                              max={deadline || undefined}
                              onChange={(event) =>
                                updateSuggestion(task.id, {
                                  suggestedDueDate: event.target.value,
                                })
                              }
                              disabled={!task.selected}
                              className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </label>
                          <div className="flex items-end pb-2 text-xs text-muted">
                            <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                            Estimate: {task.estimatedDurationHours} hours
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSuggestions((current) =>
                            current.filter((item) => item.id !== task.id),
                          )
                        }
                        disabled={saving}
                        aria-label={`Remove task ${index + 1}`}
                        className="rounded-md p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {savingError && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
            >
              {savingError}
            </p>
          )}
          {saveMessage && (
            <p
              role="status"
              className="mt-4 flex items-center gap-2 text-sm text-success"
            >
              <Check className="h-4 w-4" />
              {saveMessage}
            </p>
          )}
          {saveMessage && suggestions.length === 0 && (
            <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">
                The selected tasks are now linked to this project.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <footer className="flex flex-col-reverse gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={saving || generating}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            >
              Close
            </button>
            <Button
              type="button"
              onClick={handleSave}
              loading={saving}
              disabled={selectedCount === 0 || generating}
              className="w-full sm:w-auto"
            >
              Save Selected Tasks ({selectedCount})
            </Button>
          </footer>
        )}
      </div>
    </dialog>
  );
}
