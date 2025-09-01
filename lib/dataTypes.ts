export interface Habit {
    name: string;
    days: string[];
    time: string;
  }
  
  export interface Task {
    name: string;
    date: string;
    time: string;
  }
  
  export interface Goal {
    name: string;
    duration: string;
    start_date: string;
    habits: Habit[];
    tasks: Task[];
    notes: string[];
  }
  
  export interface SelfMadeGoals {
    goals: Goal[];
  }