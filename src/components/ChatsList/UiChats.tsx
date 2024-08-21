import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ChatItemList } from "../ChatItemList/UiChatItemList";
import classes from "./UiChats.module.scss";
import { getChatList } from "../../api/chat";
import { Chat } from "../../constants/types";
import { ChatsMock } from "./chats.mock";

interface ChatsProps {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

export const Chats: FC<ChatsProps> = ({ active, setActive }: ChatsProps) => {
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
            const isActive = chat.id === active;
            return (
              <div
                onClick={() => {
                  setActive(chat.id);
                }}
              >
                <ChatItemList
                  title={chat.title}
                  message={chat.last_message.message}
                  avatar={chat.avatar}
                  timestamp={chat.created_at}
                  active={isActive}
                  key={chat.id}
                />
              </div>
            );
          })
      ) : (
        <ChatsMock />
      )}
    </div>
  );
};
