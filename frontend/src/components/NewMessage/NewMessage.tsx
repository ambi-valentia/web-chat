import {Dispatch, SetStateAction, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {usePostMessageMutation} from '../../api/chatApi';
import {ReactComponent as SendIcon} from '../../assets/Filled.svg';
import {removeChatDraft, setChatDraft} from '../../shared';
import {selectActiveChat} from '../../store/selector';
import {useChatDrafts, useResizeInput} from './hooks';
import styles from './NewMessage.module.scss';

type Props = {
  setNewMessageFlag: Dispatch<SetStateAction<boolean>>;
};

export const NewMessage = ({setNewMessageFlag}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatId = useSelector(selectActiveChat);
  const [sendMessage] = usePostMessageMutation();
  const [message, setMessage] = useState('');

  useResizeInput({ref: textareaRef, message});
  useChatDrafts(chatId, setMessage);

  const handleSendMessage = async (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault();

    if (!message.trim()) return;

    await sendMessage({chatId, text: message.trim(), created_at: new Date().getTime()});
    setMessage('');
    setNewMessageFlag(true);
    removeChatDraft(chatId);
  };

  return (
    <div className={styles.input}>
      <textarea
        ref={textareaRef}
        className={styles.box}
        value={message}
        onChange={e => {
          setMessage(e.target.value);
          setChatDraft(chatId, e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage(e);
            return;
          }
        }}
      />
      <SendIcon className={styles.send} onClick={() => handleSendMessage()} />
    </div>
  );
};
