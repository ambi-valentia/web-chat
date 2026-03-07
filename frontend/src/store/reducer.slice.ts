import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chat, Message} from '../shared/types';

export type AppState = {
  messages: Message[];
  activeChat: Chat | null;
};

const initialState: AppState = {
  messages: [],
  activeChat: null,
};

export const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setChat: (state, action: PayloadAction<AppState['activeChat']>) => {
      state.activeChat = action.payload;
    },
  },
});

export const {setMessages, setChat} = slice.actions;

export default slice.reducer;
