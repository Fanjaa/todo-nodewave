export interface Todo {
    id: string;
    item: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }
  
export interface TodoResponse {
content: {
    entries: Todo[];
    totalData: number;
    totalPage: number;
    };
}
