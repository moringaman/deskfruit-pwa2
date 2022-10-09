// A mock function to mimic making an async request for data
import { Todo } from './todosSlice'

export function fetchTodos() {
  return new Promise<{ data: Todo[] }>((resolve) =>
    setTimeout(() => resolve({ data: [{id: 1, text: 'async todo', completed: false}, {id: 2, text: 'async todo', completed: false}] }), 500)
  );
}
