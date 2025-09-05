type Day = "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
export interface HabitFormType {
    title: string;
    repeat_days: Day[];
    reminder: string; // 09:00 am
    isPaused: boolean
  }
  
  export interface TaskFormType {
    title: string;
    dueDate: string;
    reminder: string; // 09:00 am
    note?: string
  }
  
  export interface GoalFormType {
    name: string;
    duration: string;
    start_date: string;
    habits: HabitFormType[];
    tasks: TaskFormType[];
    notes: string;
  }
  
  export interface SelfMadeGoals {
    goals: GoalFormType[];
  }