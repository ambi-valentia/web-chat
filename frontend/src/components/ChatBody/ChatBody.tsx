import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {loadChatDrafts} from '../../shared';
import {selectActiveChat} from '../../store/selector';
import {ChatList, ChatWindow} from '..';
import styles from './ChatBody.module.scss';

export const ChatBody = () => {
  const activeChat = useSelector(selectActiveChat);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadChatDrafts();
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 700px)');

    const listener = () => setIsMobile(media.matches);
    listener();

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className={styles.body}>
      {(!isMobile || (isMobile && !activeChat)) && <ChatList />}
      {activeChat && <ChatWindow />}
    </div>
  );
};
