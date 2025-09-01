import * as z from "zod"


const taskForm = z.object({

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


const goalForm = z.object({
    
})