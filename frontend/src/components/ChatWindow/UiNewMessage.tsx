import {Dispatch, SetStateAction} from 'react';
import {usePostMessageMutation} from '../../api/chatApi';
import {ReactComponent as SendIcon} from '../../assets/Filled.svg';
import classes from './UiChatWindow.module.scss';

type Props = {
  chatId: string;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

export const NewMessage = ({chatId, message, setMessage}: Props) => {
  const [sendMessage] = usePostMessageMutation();

  const handleSendMessage = (e?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault();
    sendMessage({chatId, text: message.trim(), created_at: new Date().getTime()});
    setMessage('');
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
