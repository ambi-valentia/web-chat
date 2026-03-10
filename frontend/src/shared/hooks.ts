import {useSelector} from 'react-redux';
import {useGetChatListQuery} from '../api/chatApi';
import {selectActiveChat} from '../store/selector';

export const useChatInfo = (chatId?: string) => {
  const activeChat = useSelector(selectActiveChat);

  return useGetChatListQuery(undefined, {
    selectFromResult: ({data}) => ({
      activeChat: data?.find(chat => chat.id === (chatId || activeChat)),
    }),
  });
};
