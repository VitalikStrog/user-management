import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersListReducer from '../features/UserList/userListSlice';

export const store = configureStore({
  reducer: {
    users: usersListReducer,
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
