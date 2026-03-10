import {createSelector} from '@reduxjs/toolkit';
import {RootState} from './store';

export const selectActiveChat = createSelector(
  (state: RootState) => state.main,
  main => main.activeChat
);
