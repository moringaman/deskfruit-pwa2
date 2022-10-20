import { configureStore,
  ThunkAction,
   Action
  } from '@reduxjs/toolkit';
  import todosReducer from '../features/todos/todosSlice';
import deskReducer from '../features/desk/deskSlice';
import messageReducer from '../features/messages/messageSlice'
import authReducer from '../features/auth/authenticationSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    desk: deskReducer,
    messages: messageReducer,
    auth: authReducer
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
