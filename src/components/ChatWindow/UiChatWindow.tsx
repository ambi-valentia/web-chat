import { FC, useState } from "react";
import classes from "./UiChatWindow.module.scss";
import React from "react";
import { Avatar, SystemMessage, Time } from "..";
import { ReactComponent as Send } from "../../assets/Filled.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "../../store/selector";
import { addMessage } from "../../store/reducer.slice";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: FC<ChatWindowProps> = ({
  chatId,
}: ChatWindowProps) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");

  const messages = useSelector(selectMessages);

  const handleSendMessage = () => {
    if (newMessage && newMessage?.trim()) {
      dispatch(
        addMessage({
          message: newMessage.trim(),
          created_at: new Date().getTime() / 1000,
        })
      );
      setNewMessage("");
    }
  };

  const groupedMessages =
    messages &&
    Object.groupBy(
      messages.toSorted((a, b) => {
        if (a.created_at > b.created_at) return 1;
        else if (a.created_at < b.created_at) return -1;
        else return 0;
      }),
      ({ created_at }) =>
        new Date(created_at * 1000)
          .toLocaleString("ru")
          .replace(/\//g, ".")
          .split(",")[0]
    );

  return (
    <div className={classes.window}>
      {chatId ? (
        <>
          <div className={classes.messages}>
            {groupedMessages &&
              Object.keys(groupedMessages).map((date) => (
                <React.Fragment key={date}>
                  <SystemMessage msg={date} />
                  {groupedMessages[date] &&
                    Object.keys(groupedMessages[date]).length > 0 &&
                    groupedMessages[date].map((msg, msgIndex) => (
                      <div
                        key={msgIndex}
                        className={`${classes.message} ${
                          msg.user.you ? classes.message_my : ""
                        }`}
                      >
                        {!msg.user.you && (
                          <Avatar src={msg.user.avatar} size="sm" />
                        )}{" "}
                        {msg.message}
                        <Time
                          time={new Date(msg.created_at * 1000)
                            .toLocaleString("ru")
                            .replace(/\//g, ".")
                            .split(",")[1]
                            .slice(0, 6)}
                          my={msg.user.you}
                        />
                      </div>
                    ))}
                </React.Fragment>
              ))}
          </div>
          <div className={classes.input}>
            <textarea
              className={classes.box}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Send className={classes.send} onClick={handleSendMessage}>
              Send
            </Send>
          </div>
        </>
      ) : (
        <div />
      )}
    </div>
  );
};
