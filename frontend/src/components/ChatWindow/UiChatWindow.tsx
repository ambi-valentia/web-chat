import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useGetMessagesQuery} from '../../api/chatApi';
import {Avatar, SystemMessage, Time} from '..';
import {NewMessage} from './UiNewMessage';
import classes from './UiChatWindow.module.scss';

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: FC<ChatWindowProps> = ({chatId}: ChatWindowProps) => {
  const {data: messages, isFetching} = useGetMessagesQuery(chatId);
  const chatBottomRef = useRef<null | HTMLDivElement>(null);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  useEffect(() => {
    if (newMessageFlag && !isFetching) {
      chatBottomRef.current?.scrollIntoView({behavior: 'smooth'});
      setNewMessageFlag(false);
    }
  }, [isFetching, newMessageFlag]);

  const groupedMessages = useMemo(
    () =>
      messages?.length &&
      Object.groupBy(
        messages.toSorted((a, b) => a.created_at - b.created_at),
        ({created_at}) =>
          new Date(created_at).toLocaleString('ru').replace(/\//g, '.').split(',')[0]
      ),
    [messages]
  );

  return (
    <div className={classes.window}>
      <div className={classes.messages}>
        {groupedMessages &&
          Object.keys(groupedMessages).map(date => (
            <React.Fragment key={date}>
              <SystemMessage msg={date} />
              {groupedMessages[date] &&
                Object.keys(groupedMessages[date]).length > 0 &&
                groupedMessages[date].map((msg, msgIndex) => (
                  <div
                    key={msgIndex}
                    className={`${classes.message} ${msg.user.you ? classes.message_my : ''}`}
                  >
                    {!msg.user.you && <Avatar src={msg.user.avatar} size="sm" />}
                    {msg.message}
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
