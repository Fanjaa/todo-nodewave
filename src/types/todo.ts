export interface Todo {
    id: string;
    item: string;
    isDone: boolean;
    createdAt: string;
    updatedAt: string;
    user: User;
  }

export interface User {
    id: string;
    email: string;
    fullName: string;
  }
  
export interface TodoResponse {
content: {
    entries: Todo[];
    totalData: number;
    totalPage: number;
    };
}
