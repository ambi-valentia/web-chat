import {Dispatch, SetStateAction, useRef, useState} from 'react';
import {usePostMessageMutation} from '../../api/chatApi';
import {ReactComponent as SendIcon} from '../../assets/Filled.svg';
import styles from './NewMessage.module.scss';

const INIT_INPUT_HEIGHT = '36px';

type Props = {
  chatId: string;
  setNewMessageFlag: Dispatch<SetStateAction<boolean>>;
};

export const NewMessage = ({chatId, setNewMessageFlag}: Props) => {
  const [sendMessage] = usePostMessageMutation();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault();

    if (textareaRef.current) textareaRef.current.style.height = INIT_INPUT_HEIGHT;
    if (!message.trim()) return;

    await sendMessage({chatId, text: message.trim(), created_at: new Date().getTime()});
    setMessage('');
    setNewMessageFlag(true);
  };

  return (
    <div className={styles.input}>
      <textarea
        ref={textareaRef}
        className={styles.box}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage(e);
            return;
          }
          const textarea = textareaRef.current;
          if (textarea && textarea.clientHeight < 250) {
            textarea.style.height = textareaRef.current?.scrollHeight + 'px';
          }
        }}
      />
      <SendIcon className={styles.send} onClick={() => handleSendMessage()} />
    </div>
  );
};
