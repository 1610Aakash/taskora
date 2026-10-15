import { Type } from "@google/genai";

export const DEFAULT_TASK_COUNT = 8;
export const MIN_TASK_COUNT = 5;
export const MAX_TASK_COUNT = 12;

export const PRIORITIES = ["low", "medium", "high", "urgent"];

export const taskBreakdownResponseSchema = {
  type: Type.OBJECT,
  properties: {
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A concise, actionable task title.",
          },
          description: {
            type: Type.STRING,
            description: "A concrete, bounded description of the work.",
          },
          priority: {
            type: Type.STRING,
            format: "enum",
            enum: PRIORITIES,
          },
          estimatedDurationHours: {
            type: Type.INTEGER,
          },
          suggestedDueDate: {
            type: Type.STRING,
            description: "A YYYY-MM-DD date no later than the project deadline.",
          },
        },
        required: [
          "title",
          "description",
          "priority",
          "estimatedDurationHours",
          "suggestedDueDate",
        ],
        propertyOrdering: [
          "title",
          "description",
          "priority",
          "estimatedDurationHours",
          "suggestedDueDate",
        ],
      },
    },
  },
  required: ["tasks"],
  propertyOrdering: ["tasks"],
};

export function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

export function isValidDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateGeneratedTasks(value, expectedCount, projectDeadline) {
  if (
    !isPlainObject(value) ||
    Object.keys(value).length !== 1 ||
    !Array.isArray(value.tasks) ||
    value.tasks.length !== expectedCount
  ) {
    return null;
  }

  const deadline = projectDeadline.toISOString().slice(0, 10);
  const validated = [];

  for (const task of value.tasks) {
    if (
      !isPlainObject(task) ||
      Object.keys(task).length !== 5 ||
      typeof task.title !== "string" ||
      task.title.trim().length < 3 ||
      task.title.trim().length > 120 ||
      typeof task.description !== "string" ||
      task.description.trim().length < 5 ||
      task.description.trim().length > 1600 ||
      !PRIORITIES.includes(task.priority) ||
      !Number.isInteger(task.estimatedDurationHours) ||
      task.estimatedDurationHours < 1 ||
      task.estimatedDurationHours > 80 ||
      !isValidDateOnly(task.suggestedDueDate) ||
      task.suggestedDueDate > deadline
    ) {
      return null;
    }

    validated.push({
      title: task.title.trim(),
      description: task.description.trim(),
      priority: task.priority,
      estimatedDurationHours: task.estimatedDurationHours,
      suggestedDueDate: task.suggestedDueDate,
    });
  }

  return validated;
}
