import {FC, useEffect, useRef, useState} from 'react';
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
  const {data, isFetching, isLoading} = useGetChatListQuery();
  const [popup, setPopup] = useState(false);
  const chatListTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (isLoading) setPopup(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isFetching) chatListTopRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [isFetching]);

  return (
    <div className={classes.body}>
      {popup && (
        <div className={classes.popup}>
          <img
            src={`${process.env.PUBLIC_URL}/sleepy.png`}
            alt="An image of a sleepy server"
            className={classes.image}
          />
          <p>
            Hey, *username*! I might be a bit shleepy right now... <br /> Please, wait for me to
            wake up and enjoy <br /> the chatting. Thanks!
          </p>
          <button className={classes.okayButton} onClick={() => setPopup(false)}>
            Okay<span>!</span>
          </button>
        </div>
      )}
      <div className={classes.chats}>
        <div ref={chatListTopRef} />
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
