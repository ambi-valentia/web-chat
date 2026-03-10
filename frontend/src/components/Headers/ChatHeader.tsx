import {useDispatch, useSelector} from 'react-redux';
import {ReactComponent as BackIcon} from '../../assets/ArrowBack.svg';
import {ReactComponent as ChatIcon} from '../../assets/Chat.svg';
import {useChatInfo} from '../../shared';
import {setActiveChat} from '../../store/reducer.slice';
import {selectActiveChat} from '../../store/selector';
import {Avatar} from '../Avatar';
import styles from './Header.module.scss';

type Props = {
  title?: string;
};

export const ChatHeader = ({title = 'Chat'}: Props) => {
  const dispatch = useDispatch();
  const activeChatId = useSelector(selectActiveChat);
  const {activeChat} = useChatInfo(activeChatId);

  return (
    <div className={styles.header}>
      <button className={styles.back} onClick={() => dispatch(setActiveChat(''))}>
        <BackIcon />
      </button>
      <ChatIcon />
      <div className={styles.user}>
        <span>{title}</span>
        <Avatar src={activeChat?.avatar} size="md" />
      </div>
    </div>
  );
};
