import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useGetMessagesQuery} from '../../api/chatApi';
import {useChatInfo} from '../../shared';
import {ChatHeader, NewMessage, SystemMessage} from '..';
import {Message} from './Message';
import styles from './ChatWindow.module.scss';

export const ChatWindow = () => {
  const {activeChat} = useChatInfo();
  const {data: messages, isFetching} = useGetMessagesQuery(activeChat?.id || '', {
    skip: !activeChat,
  });
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
      <ChatHeader title={activeChat?.title} />
      <div className={styles.messages}>
        {groupedMessages &&
          Object.entries(groupedMessages).map(([date, messages]) => (
            <React.Fragment key={date}>
              <SystemMessage msg={date} />
              {messages?.map(msg => (
                <Message key={msg.id} msg={msg} isPrivateChat={activeChat?.private} />
              ))}
            </React.Fragment>
          ))}
        <div className={styles['chat-bottom']} ref={chatBottomRef} />
      </div>
      <NewMessage setNewMessageFlag={setHasMyNewMsg} />
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
