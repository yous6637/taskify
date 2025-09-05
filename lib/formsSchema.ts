import * as z from "zod"


export const taskForm = z.object({
  title: z.string().trim().min(1, "Task title is required").max(100, "Title must be less than 100 characters"),
  dueDate: z.string().datetime("Invalid date format"),
  reminder: z.string().datetime("Invalid time format"),
  note: z.string().optional(),
})


const DayEnum = z.enum([
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
])

export const habitForm = z.object({
  title: z.string().trim().min(1, "Title is required"),
  repeat_days: z.array(DayEnum).min(1, "Pick at least one day"),
  // ISO datetime string from FormTimePicker (Date.toISOString())
  reminder: z.string().datetime(),
  isPaused: z.boolean().default(false),
  note: z.string().optional(),
})


export const goalForm = z.object({
  name: z.string().trim().min(1, "Goal name is required").max(100, "Goal name must be less than 100 characters"),
  duration: z.string().min(1, "Duration is required"),
  start_date: z.string().datetime("Invalid start date format"),
  habits: z.array(habitForm).optional().default([]),
  tasks: z.array(taskForm).optional().default([]),
  notes: z.string().optional(),
})

// Additional validation schemas
export const selfMadeGoalsForm = z.object({
  goals: z.array(goalForm).min(1, "At least one goal is required"),
})

// Form validation schemas for individual components
export const goalTitleForm = z.object({
  title: z.string().trim().min(1, "Goal title is required").max(100, "Title must be less than 100 characters"),
})

export const goalNoteForm = z.object({
  note: z.string().optional(),
})

// Duration options for goals
export const durationOptions = [
  { value: "1-week", label: "1 Week" },
  { value: "1-month", label: "1 Month" },
  { value: "3-months", label: "3 Months" },
  { value: "6-months", label: "6 Months" },
  { value: "1-year", label: "1 Year" },
  { value: "custom", label: "Custom" },
] as const

// Type exports for TypeScript
export type TaskFormType = z.infer<typeof taskForm>
export type HabitFormType = z.infer<typeof habitForm>
export type GoalFormType = z.infer<typeof goalForm>
export type SelfMadeGoalsFormType = z.infer<typeof selfMadeGoalsForm>
export type GoalTitleFormType = z.infer<typeof goalTitleForm>
export type GoalNoteFormType = z.infer<typeof goalNoteForm>