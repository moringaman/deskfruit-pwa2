// A mock function to mimic making an async request for data
import { Desk } from './deskSlice'

export function fetchDesk() {
  return new Promise<{ data: Desk }>((resolve) =>
    setTimeout(() => resolve({ data: {id: 'ewihfienwnw', name: 'async todo', authenticated: false, users: [], position: 'down', status: 'idle'} }), 500)
  );
}
