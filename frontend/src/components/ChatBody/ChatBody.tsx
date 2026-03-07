import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useGetChatListQuery} from '../../api/chatApi';
import {setChat} from '../../store/reducer.slice';
import {selectActiveChat} from '../../store/selector';
import {ChatItemList} from '../ChatItemList/ChatItemList';
import {Skeleton} from '../Skeleton';
import {ChatWindow} from '..';
import styles from './ChatBody.module.scss';

export const ChatBody = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);
  const {data, isFetching, isLoading} = useGetChatListQuery();
  const [popup, setPopup] = useState(false);
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        if (isLoading) setPopup(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isFetching) {
      const timer = setTimeout(() => {
        if (isFetching) setSkeleton(true);
      }, 200);

      return () => clearTimeout(timer);
    } else setSkeleton(false);
  }, [isFetching]);

  return (
    <div className={styles.body}>
      <div className={styles.chats}>
        {skeleton
          ? Array.from({length: 20})
              .fill(null, 20)
              .map((_el, idx) => (
                <div className={styles['skeleton-wrapper']} key={`skeleton-${idx}`}>
                  <Skeleton width={48} borderRadius="50%" />
                  <div className={styles['skeleton-content']}>
                    <Skeleton height={18} width="40%" />
                    <Skeleton height={26} width="90%" />
                  </div>
                </div>
              ))
          : data?.map(chat => (
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
      </div>
      {activeChat && <ChatWindow chatId={activeChat?.id} />}
      {popup && (
        <div className={styles.popup}>
          <img
            src={`${process.env.PUBLIC_URL}/sleepy.png`}
            alt="An image of a sleepy server"
            className={styles.image}
          />
          <p>
            Hey, *username*! I might be a bit shleepy right now... <br /> Please, wait for me to
            wake up and enjoy <br /> the chatting. Thanks!
          </p>
          <button className={styles.okayButton} onClick={() => setPopup(false)}>
            Okay<span>!</span>
          </button>
        </div>
      )}
    </div>
  );
};
