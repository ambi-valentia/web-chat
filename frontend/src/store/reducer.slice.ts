import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chat, Message} from '../constants/types';

export type itemIdx = number;

export interface Slice {
  messages: Message[];
  activeChat: Chat | null;
}

const initialState: Slice = {
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
    setChat: (state, action: PayloadAction<Chat>) => {
      state.activeChat = action.payload;
    },
  },
});

export const {setMessages, setChat} = slice.actions;

export default slice.reducer;
