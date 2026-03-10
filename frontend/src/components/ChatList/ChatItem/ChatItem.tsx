import {memo} from 'react';
import {Chat, getChatDraft} from '../../../shared';
import {Avatar} from '../../Avatar';
import styles from './ChatItem.module.scss';

type Props = {
  chatInfo: Chat;
  isActive: boolean;
  onClick: (chatId: string) => void;
};

const ChatItemInner = ({chatInfo, isActive, onClick}: Props) => {
  const {id, title, avatar, last_message} = chatInfo;
  const dateToDisplay = getDateToDisplay(last_message.created_at);
  const draft = getChatDraft(id);

  return (
    <div className={styles.chat} data-active={isActive} onClick={() => onClick(id)}>
      <Avatar src={avatar} size="lg" />
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.title}>{title}</span>
          {dateToDisplay && <span className={styles.time}>{dateToDisplay}</span>}
        </div>
        <div className={styles.message}>
          {draft && <span className={styles.draft}>Draft: </span>}
          {draft || last_message.message}
        </div>
      </div>
    </div>
  );
};

export const ChatItem = memo(ChatItemInner);

const getDateToDisplay = (date?: number) => {
  if (!date) return '';

  const dateResult = new Date(date);
  const now = new Date().setHours(0, 0, 0, 0);
  const week = 24 * 60 * 60 * 1000 * 7;

  if (date >= now) return dateResult.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'});
  else if (date >= now - week) return dateResult.toLocaleDateString('en', {weekday: 'short'});
  else return dateResult.toLocaleDateString('ru');
};
