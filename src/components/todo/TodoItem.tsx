'use client';

import { Todo } from '@/types/todo';
import Button from '@/components/ui/Button';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  isLoading
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded border-gray-300"
          disabled={isLoading}
        />
        <span className={todo.isDone ? 'line-through text-gray-500' : ''}>
          {todo.item}
        </span>
      </div>
      <Button
        variant="danger"
        onClick={() => onDelete(todo.id)}
        isLoading={isLoading}
      >
        Delete
      </Button>
    </div>
  );
}