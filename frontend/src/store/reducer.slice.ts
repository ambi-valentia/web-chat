import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AppState = {
  activeChat: string;
};

const initialState: AppState = {
  activeChat: '',
};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<AppState['activeChat']>) => {
      state.activeChat = action.payload;
    },
  },
});

export const {setActiveChat} = slice.actions;

export default slice.reducer;
