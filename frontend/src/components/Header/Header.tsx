import {ReactComponent as Chat} from '../../assets/Chat.svg';
import styles from './Header.module.scss';

type Props = {
  title?: string;
};

export const Header = ({title = 'Chat'}: Props) => {
  return (
    <div className={styles.header}>
      <span className={styles.chats}>All chats</span>
      <div className={styles.chats__active}>
        <Chat />
        <span>{title}</span>
      </div>
    </div>
  );
};
