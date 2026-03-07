import {useSelector} from 'react-redux';
import {selectActiveChat} from '../../store/selector';
import {ChatList, ChatWindow} from '..';
import styles from './ChatBody.module.scss';

export const ChatBody = () => {
  const activeChat = useSelector(selectActiveChat);

  return (
    <div className={styles.body}>
      <ChatList activeChat={activeChat} />
      {activeChat && <ChatWindow activeChat={activeChat} />}
    </div>
  );
};
