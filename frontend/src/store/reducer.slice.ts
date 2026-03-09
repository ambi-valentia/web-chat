import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chat} from '../shared/types';

export type AppState = {
  activeChat: Chat | null;
};

const initialState: AppState = {
  activeChat: null,
};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<AppState['activeChat']>) => {
      state.activeChat = action.payload;
    },
  },
});

export const {setChat} = slice.actions;

export default slice.reducer;
