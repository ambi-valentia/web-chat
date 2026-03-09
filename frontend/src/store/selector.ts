import {RootState} from './store';

export const selectActiveChat = (state: RootState) => state.main.activeChat;
