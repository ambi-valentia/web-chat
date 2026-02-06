import {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetChatListQuery} from '../../api/chatApi';
import {setChat} from '../../store/reducer.slice';
import {selectActiveChat} from '../../store/selector';
import {ChatItemList} from '../ChatItemList/UiChatItemList';
import {ChatWindow} from '..';
import classes from './UiChatBody.module.scss';

export const Chats: FC = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);
  const {data, isFetching} = useGetChatListQuery();

  return (
    <div className={classes.body}>
      <div className={classes.chats}>
        {data?.map(chat => (
          <ChatItemList
            title={chat.title}
            message={chat.last_message.message}
            avatar={chat.avatar}
            timestamp={chat.last_message.created_at}
            active={chat.id === activeChat?.id}
            key={chat.id}
            onClick={() => dispatch(setChat(chat))}
          />
        ))}
        {isFetching && <div>Loading...</div>}
      </div>
      {activeChat && <ChatWindow chatId={activeChat?.id} />}
    </div>
  );
};
