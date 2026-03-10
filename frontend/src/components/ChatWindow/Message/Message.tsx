import {Message as MessageType} from '../../../shared';
import {Avatar, Time} from '../..';
import styles from './Message.module.scss';

type Props = {
  msg: MessageType;
  isPrivateChat?: boolean;
};

export const Message = ({msg, isPrivateChat = true}: Props) => (
  <div className={styles['message-container']} data-my={msg.user.you}>
    <div className={styles['message-text']}>
      {!msg.user.you && !isPrivateChat && <Avatar src={msg.user.avatar} size="sm" />}
      <p>{msg.message}</p>
    </div>
    <Time
      time={new Date(msg.created_at).toLocaleTimeString('ru', {
        timeStyle: 'short',
      })}
      my={msg.user.you}
    />
  </div>
);
