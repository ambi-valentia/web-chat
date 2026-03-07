import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useGetMessagesQuery} from '../../api/chatApi';
import {Avatar, NewMessage, SystemMessage, Time} from '..';
import styles from './ChatWindow.module.scss';

type Props = {
  chatId: string;
};

export const ChatWindow = ({chatId}: Props) => {
  const {data: messages, isFetching} = useGetMessagesQuery(chatId);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [hasMyNewMsg, setHasMyNewMsg] = useState(false);

  useEffect(() => {
    if (hasMyNewMsg && !isFetching) {
      chatBottomRef.current?.scrollIntoView({behavior: 'smooth'});
      setHasMyNewMsg(false);
    }
  }, [isFetching, hasMyNewMsg]);

  const groupedMessages = useMemo(() => {
    if (messages?.length)
      return Object.groupBy(
        messages.toSorted((a, b) => a.created_at - b.created_at),
        ({created_at}) => getDateToDisplay(created_at)
      );
  }, [messages]);

  return (
    <div className={styles.window}>
      <div className={styles.messages}>
        {groupedMessages &&
          Object.entries(groupedMessages).map(([date, messages]) => (
            <React.Fragment key={date}>
              <SystemMessage msg={date} />
              {messages?.map((msg, msgIndex) => (
                <div key={msgIndex} className={styles['message-container']} data-my={msg.user.you}>
                  <div className={styles.message}>
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
        <div className={styles['chat-bottom']} ref={chatBottomRef} />
      </div>
      <NewMessage setNewMessageFlag={setHasMyNewMsg} chatId={chatId} />
    </div>
  );
};

const getDateToDisplay = (date: number) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const month = 31 * 24 * 60 * 60 * 1000;

  if (date > today - month)
    return new Date(date).toLocaleDateString('en', {day: 'numeric', month: 'long'});
  else return new Date(date).toLocaleDateString('ru');
};
