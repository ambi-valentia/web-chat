import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Chat, Message} from '../constants/types';

export const BASE_API_URL = process.env.REACT_APP_API_URL;
const getChatUrl = (chatId: string) => `chats/${chatId}/messages`;

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ['Messages', 'Chats'],
  endpoints: build => ({
    getChatList: build.query<Chat[], void>({
      query: () => 'chats',
      transformResponse: (response: Chat[]) =>
        response.sort((a, b) => b.last_message.created_at - a.last_message.created_at),
      providesTags: ['Chats'],
    }),
    getMessages: build.query<Message[], string>({
      query: chatId => getChatUrl(chatId),
      providesTags: (result, error, chatId) => [{type: 'Messages', id: chatId}],
    }),
    postMessage: build.mutation<Message, {chatId: string; text: string; created_at: number}>({
      query: ({chatId, text, created_at}) => ({
        method: 'POST',
        url: getChatUrl(chatId),
        body: {text, created_at},
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Messages', id: arg.chatId}, 'Chats'],
    }),
  }),
});

export const {useGetChatListQuery, useGetMessagesQuery, usePostMessageMutation} = chatApi;
