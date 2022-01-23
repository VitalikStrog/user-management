import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUsers, getUser, createUser, editUser, deleteUser } from './userListAPI';

export interface userListState {
  usersList: User[];
  selectedUser: User | null;
  selectedUserID: number;
  isLoading: boolean;
  searchInputValue: string,
}

const initialState: userListState = {
  usersList: [],
  selectedUser: null,
  selectedUserID: 0,
  isLoading: false,
  searchInputValue: '',
};

export const loadUsers = createAsyncThunk(
  'usersList/loadUsers',
  async () => await getUsers(),
);

export const loadUser = createAsyncThunk(
  'usersList/loadUser',
  async (userId: number) => await getUser(userId),
);

export const addUser = createAsyncThunk(
  'usersList/addUser',
  async (newUser: User) => await createUser(newUser),
);

export const updateUser = createAsyncThunk(
  'usersList/editUser',
  async (params: { userId: number, editedFields: Partial<User>}) => await editUser(params.userId, params.editedFields),
);

export const removeUser = createAsyncThunk(
  'usersList/deleteUser',
  async (userId: number) => await deleteUser(userId),
);

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserID = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearchInputValue: (state, action) => {
      state.searchInputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.isLoading = false;
      })
  }
});

export const { setSelectedUserId, setLoading, setSearchInputValue } = usersListSlice.actions;

export const getSearchInputValue = (state: RootState) => state.users.searchInputValue;
export const getSelectedUser = (state: RootState) => state.users.selectedUser;
export const getSelectedUserID = (state: RootState) => state.users.selectedUserID;
export const getUsersList = (state: RootState) => state.users.usersList;
export const getIsLoading = (state: RootState) => state.users.isLoading;

export default usersListSlice.reducer;
