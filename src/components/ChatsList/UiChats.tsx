import { FC, useEffect, useState } from "react";
import { ChatItemList } from "../ChatItemList/UiChatItemList";
import classes from "./UiChats.module.scss";
import { getChatList } from "../../api/chat";
import { Chat } from "../../constants/types";
import { ChatsMock } from "./chats.mock";

export const Chats: FC = () => {
  const [chats, setChats] = useState<Chat[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    getChatList()
      .then((result) => {
        setChats(result.response);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    alert(`Error: ${error.message}`);
  }

  return (
    <div className={classes.chats}>
      {chats ? (
        chats
          .sort((a, b) => {
            if (a.created_at < b.created_at) return 1;
            else if (a.created_at > b.created_at) return -1;
            else return 0;
          })
          .map((chat) => {
            return (
              <ChatItemList
                title={chat.title}
                message={chat.last_message.message}
                avatar={chat.avatar}
                timestamp={chat.created_at}
                key={chat.id}
              />
            );
          })
      ) : (
        <ChatsMock />
      )}
    </div>
  );
};
