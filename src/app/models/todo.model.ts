export class Todo {
  id!: number;
  title!: string;
  isCompleted!: boolean;
  lastUpdateddAt!: string;
}

export interface ApiResponse {
  result: number;
  data: Todo[];
  error: any;
}