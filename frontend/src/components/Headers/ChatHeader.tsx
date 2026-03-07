import {useDispatch, useSelector} from 'react-redux';
import {ReactComponent as BackIcon} from '../../assets/ArrowBack.svg';
import {ReactComponent as ChatIcon} from '../../assets/Chat.svg';
import {setChat} from '../../store/reducer.slice';
import {selectActiveChat} from '../../store/selector';
import {Avatar} from '../Avatar';
import styles from './Header.module.scss';

type Props = {
  title?: string;
};

export const ChatHeader = ({title = 'Chat'}: Props) => {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);

  return (
    <div className={styles.header}>
      <button className={styles.back} onClick={() => dispatch(setChat(null))}>
        <BackIcon />
      </button>
      <ChatIcon />
      <Avatar src={activeChat?.avatar} size="md" />
      <span>{title}</span>
    </div>
  );
};
