"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  CircleHelp,
  FolderKanban,
  ListChecks,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  Send,
  Sparkles,
  TriangleAlert,
  UserRound,
} from "lucide-react";

const SUGGESTIONS = [
  "Which of my tasks are overdue?",
  "What tasks do I need to finish this week?",
  "Summarize my current project.",
  "What should I work on next?",
  "How many tasks are still pending?",
  "Show me my recently completed tasks.",
  "Which of my projects need attention?",
];

function formatDate(value) {
  if (!value) return "No due date";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatLabel(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ReferenceCard({ reference }) {
  const isTask = reference.type === "task";
  const Icon = isTask ? ListChecks : FolderKanban;

  return (
    <Link
      href={reference.href}
      className="group flex min-w-0 items-start gap-3 rounded-xl border border-border/80 bg-background/70 p-3 transition-colors hover:border-primary/50 hover:bg-card-elevated"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
          {reference.title}
        </span>
        <span className="mt-1 block truncate text-xs text-muted">
          {isTask ? reference.projectName : formatLabel(reference.status)}
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
          {isTask ? (
            <>
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="h-3 w-3" aria-hidden="true" />
                {formatDate(reference.dueDate)}
              </span>
              <span>{formatLabel(reference.priority)}</span>
              <span>{formatLabel(reference.status)}</span>
            </>
          ) : (
            <>
              <span>{reference.openTasks} open</span>
              <span>{reference.overdueTasks} overdue</span>
              <span>{reference.totalTasks} total</span>
            </>
          )}
        </span>
      </span>
      <ArrowRight
        className="mt-2 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
}

function AssistantMessage({ message, onRetry }) {
  const isUser = message.role === "user";

  return (
    <article
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      aria-label={isUser ? "Your message" : "Taskora AI response"}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          isUser
            ? "bg-card-elevated text-foreground"
            : "bg-primary/15 text-primary"
        }`}
      >
        {isUser ? (
          <UserRound className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Bot className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
      <div
        className={`min-w-0 max-w-[88%] space-y-3 ${
          isUser ? "text-right" : ""
        }`}
      >
        <div
          className={`inline-block rounded-2xl px-4 py-3 text-left text-sm leading-6 ${
            isUser
              ? "rounded-tr-md bg-primary text-primary-foreground"
              : "rounded-tl-md border border-border bg-card"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          {message.error && (
            <div className="mt-3 flex items-center gap-2 text-xs text-danger">
              <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
              <span>That request didn&apos;t go through.</span>
              <button
                type="button"
                onClick={() => onRetry(message.retryQuestion)}
                className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-foreground"
              >
                <RefreshCw className="h-3 w-3" aria-hidden="true" />
                Retry
              </button>
            </div>
          )}
        </div>
        {!isUser && message.facts && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <p className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              {message.facts.label}: {message.facts.count}
            </p>
            {message.facts.displayed < message.facts.count && (
              <span>
                Showing {message.facts.displayed} of {message.facts.count}
              </span>
            )}
          </div>
        )}
        {!isUser && message.references?.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-2">
            {message.references.map((reference) => (
              <ReferenceCard
                key={`${reference.type}-${reference.id}`}
                reference={reference}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function AssistantView() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [requestError, setRequestError] = useState("");
  const inFlight = useRef(false);
  const conversationEnd = useRef(null);
  const textarea = useRef(null);

  useEffect(() => {
    conversationEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function submitQuestion(rawQuestion, retry = false) {
    const trimmed = rawQuestion.trim();
    if (!trimmed || inFlight.current) return;

    inFlight.current = true;
    setLoading(true);
    setRequestError("");
    setPendingQuestion(trimmed);
    if (retry) {
      setMessages((current) =>
        current.filter(
          (message) =>
            !(message.error && message.retryQuestion === trimmed),
        ),
      );
    } else {
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "user", content: trimmed },
      ]);
      setQuestion("");
    }

    try {
      const history = messages
        .filter((message) => !message.error)
        .slice(-6)
        .map(({ role, content }) => ({ role, content: content.slice(0, 500) }));
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, conversation: history }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error || "Ask Taskora AI couldn't answer right now.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.data.answer,
          references: payload.data.references || [],
          facts: payload.data.facts || null,
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ask Taskora AI couldn't answer right now.";
      setRequestError(message);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: message,
          error: true,
          retryQuestion: trimmed,
        },
      ]);
    } finally {
      inFlight.current = false;
      setLoading(false);
      setPendingQuestion("");
      textarea.current?.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitQuestion(question);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submitQuestion(question);
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-8.5rem)] w-full max-w-5xl flex-col pb-20 md:pb-0">
      <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Your workspace, understood
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ask Taskora AI
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Ask about the tasks and projects you can access. Answers are based
            on your current Taskora workspace.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          Read-only assistant
        </div>
      </header>

      <div className="surface flex h-[calc(100dvh-20rem)] min-h-[28rem] max-h-[55rem] flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Workspace assistant</p>
              <p className="text-xs text-muted">Private to your signed-in account</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMessages([]);
                setRequestError("");
              }}
              disabled={loading}
              className="rounded-lg px-3 py-2 text-xs font-medium text-muted transition-colors hover:bg-card-elevated hover:text-foreground"
            >
              New conversation
            </button>
          )}
        </div>

        <div
          className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {messages.length === 0 ? (
            <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-base font-semibold text-foreground">
                What can I help you with?
              </h2>
              <p className="mt-1 max-w-sm text-sm leading-6 text-muted">
                I can find work that needs attention, summarize a project, or
                help you decide what to focus on.
              </p>
              <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => submitQuestion(suggestion)}
                    disabled={loading}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3.5 py-3 text-left text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:bg-card-elevated hover:text-foreground disabled:opacity-50"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-muted transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <AssistantMessage
                key={message.id}
                message={message}
                onRetry={(retryQuestion) =>
                  submitQuestion(retryQuestion, true)
                }
              />
            ))
          )}
          {loading && (
            <div className="flex gap-3" role="status" aria-label="Assistant is thinking">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Bot className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3">
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Reviewing your workspace
                </span>
              </div>
            </div>
          )}
          <div ref={conversationEnd} />
        </div>

        <div className="border-t border-border bg-background/30 p-3 sm:p-4">
          {requestError && (
            <p className="mb-2 flex items-center gap-2 text-xs text-danger" role="status">
              <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
              {requestError}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <label htmlFor="assistant-question" className="sr-only">
              Ask a question about your tasks or projects
            </label>
            <textarea
              id="assistant-question"
              ref={textarea}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={600}
              rows={1}
              placeholder="Ask about your tasks or projects..."
              className="max-h-36 min-h-12 flex-1 resize-y rounded-xl border border-border bg-card px-4 py-3 text-sm leading-5 text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              aria-label="Send message"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </form>
          <div className="mt-2 flex justify-between px-1 text-[11px] text-muted">
            <span>Enter to send · Shift+Enter for a new line</span>
            <span>{question.length}/600</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">
        AI recommendations can be imperfect. Task facts and counts come from
        your current workspace data.
      </p>
      {pendingQuestion && <span className="sr-only">Sending: {pendingQuestion}</span>}
    </section>
  );
}
