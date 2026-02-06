import {FC} from 'react';
import {Avatar} from '../Avatar';
import classes from './UiChatItem.module.scss';

interface IChatItemList {
  message: string;
  avatar: string;
  onClick: () => void;
  title?: string;
  active?: boolean;
  timestamp?: number;
}

export const ChatItemList: FC<IChatItemList> = ({
  avatar,
  message,
  timestamp,
  onClick,
  title = 'Chat',
  active = false,
}: IChatItemList) => {
  const date = timestamp ? new Date(timestamp) : null;
  const dateToDisplay =
    date?.getDate() === new Date().getDate()
      ? date?.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})
      : date?.toLocaleDateString('ru');

  return (
    <div className={`${classes.chat} ${active ? classes.chat_active : ''}`} onClick={onClick}>
      <Avatar src={avatar} size="md" />
      <div className={classes.content}>
        <div className={classes.top}>
          <span className={classes.title}>{title}</span>
          {dateToDisplay && <span className={classes.time}>{dateToDisplay}</span>}
        </div>
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
};
