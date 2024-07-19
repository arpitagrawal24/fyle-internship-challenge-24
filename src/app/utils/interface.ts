export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

export interface ExtendedUser extends User {
  workoutTypes: string;
  workoutCount: number;
  totalMinutes: number;
}
