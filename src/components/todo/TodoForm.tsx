'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface TodoFormProps {
  onSubmit: (item: string) => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const [item, setItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(item);
      setItem('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        placeholder="Add new todo..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" isLoading={isLoading}>
        Add
      </Button>
    </form>
  );
}