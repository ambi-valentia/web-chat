import {Chat, getChatDraft} from '../../../shared';
import {Avatar} from '../../Avatar';
import styles from './ChatItem.module.scss';

type Props = {
  chatInfo: Chat;
  active: boolean;
  onClick: () => void;
};

export const ChatItem = ({chatInfo, active, onClick}: Props) => {
  const {title, avatar, last_message} = chatInfo;
  const dateToDisplay = getDateToDisplay(last_message.created_at);
  const draft = getChatDraft(chatInfo.id);

  return (
    <div className={styles.chat} data-active={active} onClick={onClick}>
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

const getDateToDisplay = (date?: number) => {
  if (!date) return '';

  const dateResult = new Date(date);
  const now = new Date().setHours(0, 0, 0, 0);
  const week = 24 * 60 * 60 * 1000 * 7;

  if (date >= now) return dateResult.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'});
  else if (date >= now - week) return dateResult.toLocaleDateString('en', {weekday: 'short'});
  else return dateResult.toLocaleDateString('ru');
};
