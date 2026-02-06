import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Chat, Message} from '../constants/types';

const getChatUrl = (chatId: string) => `chats/${chatId}/messages`;

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
  }),
  endpoints: build => ({
    getChatList: build.query<Chat[], void>({
      query: () => 'chats',
      transformResponse: (response: Chat[]) =>
        response.sort((a, b) => b.last_message.created_at - a.last_message.created_at),
    }),
    getMessages: build.query<Message[], string>({
      query: chatId => getChatUrl(chatId),
    }),
    postMessage: build.mutation<Message, {chatId: string; text: string}>({
      query: ({chatId, text}) => ({
        method: 'POST',
        url: getChatUrl(chatId),
        body: JSON.stringify(text),
      }),
    }),
  }),
});

export const {useGetChatListQuery, useGetMessagesQuery, usePostMessageMutation} = chatApi;
