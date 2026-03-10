import {Dispatch, SetStateAction, useLayoutEffect, useRef, useState} from 'react';
import {usePostMessageMutation} from '../../api/chatApi';
import {ReactComponent as SendIcon} from '../../assets/Filled.svg';
import {useResizeInput} from './hooks';
import styles from './NewMessage.module.scss';

const MAX_INPUT_HEIGHT = 250;

type Props = {
  chatId: string;
  setNewMessageFlag: Dispatch<SetStateAction<boolean>>;
};

export const NewMessage = ({chatId, setNewMessageFlag}: Props) => {
  const [sendMessage] = usePostMessageMutation();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {resizeInput, resetInputHeight} = useResizeInput({ref: textareaRef});

  useLayoutEffect(() => setMessage(''), [chatId]);

  useLayoutEffect(() => {
    if (!message.trim()) {
      resetInputHeight();
      return;
    }
    resizeInput({maxHeight: MAX_INPUT_HEIGHT});
  }, [message, resetInputHeight, resizeInput]);

  const handleSendMessage = async (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault();

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
        onChange={e => {
          setMessage(e.target.value);
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
