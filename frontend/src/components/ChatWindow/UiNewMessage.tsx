import {Dispatch, SetStateAction, useState} from 'react';
import {usePostMessageMutation} from '../../api/chatApi';
import {ReactComponent as SendIcon} from '../../assets/Filled.svg';
import classes from './UiChatWindow.module.scss';

type Props = {
  chatId: string;
  setNewMessageFlag: Dispatch<SetStateAction<boolean>>;
};

export const NewMessage = ({chatId, setNewMessageFlag}: Props) => {
  const [sendMessage] = usePostMessageMutation();
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault();
    await sendMessage({chatId, text: message.trim(), created_at: new Date().getTime()});
    setMessage('');
    setNewMessageFlag(true);
  };

  return (
    <div className={classes.input}>
      <textarea
        className={classes.box}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => (e.key === 'Enter' && !e.shiftKey ? handleSendMessage(e) : null)}
      />
      <SendIcon className={classes.send} onClick={() => handleSendMessage()}>
        Send
      </SendIcon>
    </div>
  );
};
