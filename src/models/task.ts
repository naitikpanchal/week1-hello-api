export interface Task {
  id: number;
  title: string;
  completed: boolean;
}
export interface TaskPayload {
  title: string;
  completed?: boolean;
}
