import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useGetMessagesQuery} from '../../api/chatApi';
import {Avatar, SystemMessage, Time} from '..';
import {NewMessage} from './NewMessage';
import classes from './UiChatWindow.module.scss';

const getDateToDisplay = (date: number) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const month = 31 * 24 * 60 * 60 * 1000;

  if (date > today - month)
    return new Date(date).toLocaleDateString('en', {day: 'numeric', month: 'long'});
  else return new Date(date).toLocaleDateString('ru');
};

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: FC<ChatWindowProps> = ({chatId}: ChatWindowProps) => {
  const {data: messages, isFetching} = useGetMessagesQuery(chatId);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  useEffect(() => {
    if (newMessageFlag && !isFetching) {
      chatBottomRef.current?.scrollIntoView({behavior: 'smooth'});
      setNewMessageFlag(false);
    }
  }, [isFetching, newMessageFlag]);

  const groupedMessages = useMemo(() => {
    if (messages?.length)
      return Object.groupBy(
        messages.toSorted((a, b) => a.created_at - b.created_at),
        ({created_at}) => getDateToDisplay(created_at)
      );
  }, [messages]);

  return (
    <div className={classes.window}>
      <div className={classes.messages}>
        {groupedMessages &&
          Object.entries(groupedMessages).map(([date, messages]) => (
            <React.Fragment key={date}>
              <SystemMessage msg={date} />
              {messages?.map((msg, msgIndex) => (
                <div key={msgIndex} className={classes['message-container']} data-my={msg.user.you}>
                  <div className={classes.message}>
                    {!msg.user.you && <Avatar src={msg.user.avatar} size="sm" />}
                    <p>{msg.message}</p>
                  </div>
                  <Time
                    time={new Date(msg.created_at).toLocaleTimeString('ru', {
                      timeStyle: 'short',
                    })}
                    my={msg.user.you}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        <div ref={chatBottomRef} />
      </div>
      <NewMessage setNewMessageFlag={setNewMessageFlag} chatId={chatId} />
    </div>
  );
};
