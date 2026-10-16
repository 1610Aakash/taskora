export const OPEN_TASK_STATUSES = ["todo", "in-progress"];

function classifyQuestion(question) {
  const normalized = question.toLowerCase();

  if (/\b(overdue|past[- ]due|late tasks?)\b/.test(normalized)) {
    return "overdue";
  }
  if (
    /\b(this week|due this week|coming week|next 7 days)\b/.test(normalized)
  ) {
    return "week";
  }
  if (
    /\b(recently completed|recent completions|finished tasks?|completed tasks?)\b/.test(
      normalized,
    )
  ) {
    return "completed";
  }
  if (
    /\b(pending|unfinished|open tasks?|still to do)\b/.test(normalized) ||
    /\bhow many\b.*\btasks?\b/.test(normalized)
  ) {
    return "pending";
  }
  if (
    /\b(summarize|summarise|summary|overview)\b.*\bproject\b/.test(normalized) ||
    /\bproject\b.*\b(summarize|summarise|summary|overview)\b/.test(normalized)
  ) {
    return "summary";
  }
  if (
    /\b(what should i work on|what do i work on next|recommend|next task|prioritize)\b/.test(
      normalized,
    )
  ) {
    return "next";
  }
  if (/\bprojects?\b.*\b(attention|at risk|need help)\b/.test(normalized)) {
    return "attention";
  }

  return "help";
}

export function getAssistantIntent(question, conversation = []) {
  const currentIntent = classifyQuestion(question);
  if (currentIntent !== "help") return currentIntent;

  const previousUserMessage = [...conversation]
    .reverse()
    .find((message) => message.role === "user");
  return previousUserMessage
    ? classifyQuestion(previousUserMessage.content)
    : "help";
}

export function getUtcWeekRange(now = new Date()) {
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const dayOfWeek = start.getUTCDay();
  start.setUTCDate(start.getUTCDate() - ((dayOfWeek + 6) % 7));

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);

  return { start, end };
}
