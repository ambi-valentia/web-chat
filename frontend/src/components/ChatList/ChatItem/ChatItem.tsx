import {Avatar} from '../../Avatar';
import styles from './ChatItem.module.scss';

type Props = {
  message: string;
  avatar: string;
  onClick: () => void;
  title?: string;
  active?: boolean;
  timestamp?: number;
};

export const ChatItem = ({
  avatar,
  message,
  timestamp,
  onClick,
  title = 'Chat',
  active = false,
}: Props) => {
  const dateToDisplay = getDateToDisplay(timestamp);

  return (
    <div className={`${styles.chat} ${active ? styles.chat_active : ''}`} onClick={onClick}>
      <Avatar src={avatar} size="md" />
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.title}>{title}</span>
          {dateToDisplay && <span className={styles.time}>{dateToDisplay}</span>}
        </div>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
};

const getDateToDisplay = (date?: number) => {
  if (!date) return '';

  const dateResult = new Date(date);
  const now = new Date().setHours(0, 0, 0, 0);
  const week = 24 * 60 * 60 * 1000 * 7;

  if (date >= now) return dateResult.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'});
  else if (date >= now - week) return dateResult.toLocaleDateString('en', {weekday: 'short'});
  else return dateResult.toLocaleDateString('ru');
};
