type Day = "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
export interface Habit {
    title: string;
    repeat_days: Day[];
    reminder: string; // 09:00 am
    isPaused: boolean
  }
  
  export interface Task {
    title: string;
    dueDate: string;
    reminder: string; // 09:00 am
    note: string
  }
  
  export interface Goal {
    name: string;
    duration: string;
    start_date: string;
    habits: Habit[];
    tasks: Task[];
    notes: string;
  }
  
  export interface SelfMadeGoals {
    goals: Goal[];
  }