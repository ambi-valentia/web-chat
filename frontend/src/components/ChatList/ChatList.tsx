import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useGetChatListQuery} from '../../api/chatApi';
import {AppState, setChat} from '../../store/reducer.slice';
import {ListHeader} from '../Headers';
import {Skeleton} from '../Skeleton';
import {ChatItem} from './ChatItem';
import {Popup} from './Popup';
import styles from './ChatList.module.scss';

export const ChatList = ({activeChat}: {activeChat: AppState['activeChat']}) => {
  const dispatch = useDispatch();
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
    <div className={styles.chatlist}>
      <ListHeader />
      {skeleton
        ? getSkeletons()
        : data?.map(chat => (
            <ChatItem
              title={chat.title}
              message={chat.last_message.message}
              avatar={chat.avatar}
              timestamp={chat.last_message.created_at}
              active={chat.id === activeChat?.id}
              key={chat.id}
              onClick={() => dispatch(setChat(chat))}
            />
          ))}
      <Popup isVisible={popup} onClick={() => setPopup(false)} />
    </div>
  );
};

const getSkeletons = () =>
  Array.from({length: 20})
    .fill(null, 20)
    .map((_el, idx) => (
      <div className={styles['skeleton-wrapper']} key={`skeleton-${idx}`}>
        <Skeleton width={48} borderRadius="50%" />
        <div className={styles['skeleton-content']}>
          <Skeleton height={18} width="40%" />
          <Skeleton height={26} width="90%" />
        </div>
      </div>
    ));
