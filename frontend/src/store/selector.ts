import { RootState } from "./store";

export const selectMessages = (state: RootState) => state.main.messages;
export const selectActiveChat = (state: RootState) => state.main.activeChat;
