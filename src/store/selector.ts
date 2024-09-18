import { RootState } from "./store";

export const selectMessages = (state: RootState) => state.mainReducer.messages;
export const selectActiveChat = (state: RootState) => state.mainReducer.activeChat;