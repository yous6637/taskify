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

const CATEGORIES = [
  {
    name: "career",
    label: "Career",
    icon: "briefcase",
    color: "bg-blue-500"
  },
  {
    name: "health",
    label: "Health",
    icon: "heart",
    color: "bg-red-500"
  },
  {
    name: "travel",
    label: "Travel",
    icon: "airplane",
    color: "bg-green-500"
  },
  {
    name: "education",
    label: "Education",
    icon: "book",
    color: "bg-purple-500"
  },
  {
    name: "personal",
    label: "Personal",
    icon: "person",
    color: "bg-indigo-500"
  },
  {
    name: "fitness",
    label: "Fitness",
    icon: "fitness",
    color: "bg-orange-500"
  },
  {
    name: "creative",
    label: "Creative",
    icon: "color-palette",
    color: "bg-pink-500"
  },
  {
    name: "financial",
    label: "Financial",
    icon: "cash",
    color: "bg-emerald-500"
  },
  {
    name: "relationships",
    label: "Relationships",
    icon: "people",
    color: "bg-rose-500"
  },
  {
    name: "hobbies",
    label: "Hobbies",
    icon: "game-controller",
    color: "bg-cyan-500"
  },
  {
    name: "productivity",
    label: "Productivity",
    icon: "checkmark-circle",
    color: "bg-teal-500"
  },
  {
    name: "mindfulness",
    label: "Mindfulness",
    icon: "leaf",
    color: "bg-lime-500"
  },
] as const

export const habitForm = z.object({
  title: z.string().trim().min(1, "Title is required"),
  repeat_days: z.array(DayEnum).min(1, "Pick at least one day"),
  // ISO datetime string from FormTimePicker (Date.toISOString())
  reminder: z.string().datetime(),
  isPaused: z.boolean().default(false),
  note: z.string().optional(),
})


// Extract category names for enum validation
const CATEGORY_NAMES = CATEGORIES.map(cat => cat.name) as string[]

// Category enum for goals
const CategoryEnumSchema = z.enum(CATEGORY_NAMES as [string, ...string[]])



export const goalForm = z.object({
  title: z.string().trim().min(1, "Goal title is required").max(100, "Goal name must be less than 100 characters"),
  due_date: z.string().datetime("Invalid start date format"),
  category: CategoryEnumSchema,
  reminder: z.string().time(),
  notes: z.string().default(""),
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

// Helper functions for categories
export const getCategoryByName = (name: string) => {
  return CATEGORIES.find(cat => cat.name === name)
}

export const getCategoryOptions = () => {
  return CATEGORIES.map(cat => ({
    value: cat.name,
    label: cat.label,
    icon: cat.icon,
    color: cat.color
  }))
}

// Type exports for TypeScript
export type TaskFormType = z.infer<typeof taskForm>
export type HabitFormType = z.infer<typeof habitForm>
export type GoalFormType = z.infer<typeof goalForm>
export type SelfMadeGoalsFormType = z.infer<typeof selfMadeGoalsForm>
export type GoalTitleFormType = z.infer<typeof goalTitleForm>
export type GoalNoteFormType = z.infer<typeof goalNoteForm>
export type CategoryNameType = z.infer<typeof CategoryEnumSchema>
export type CategoryType = typeof CATEGORIES[number]

// Export categories for use in components
export { CATEGORIES }