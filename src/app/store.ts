import { configureStore,
  ThunkAction,
   Action
  } from '@reduxjs/toolkit';
  import todosReducer from '../features/todos/todosSlice';
import deskReducer from '../features/desk/deskSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    desk: deskReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
