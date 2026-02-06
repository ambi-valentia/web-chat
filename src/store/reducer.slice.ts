import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat, Message } from "../constants/types";

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
  name: "main",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        message: string;
        created_at: number;
      }>,
    ) => {
      const { created_at, message } = action.payload;
      state.messages = [
        ...state.messages,
        {
          created_at: created_at,
          user: { you: true },
          message: message,
          is_new: true,
        },
      ];
    },
    setChat: (state, action: PayloadAction<Chat>) => {
      state.activeChat = action.payload;
    },
  },
});

export const { setMessages, addMessage, setChat } = slice.actions;

export default slice.reducer;
