import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ChatItemList } from "../ChatItemList/UiChatItemList";
import classes from "./UiChats.module.scss";
import { getChatList } from "../../api/chat";
import { Chat } from "../../constants/types";
import { ChatsMock } from "./chats.mock";
import { useDispatch } from "react-redux";
import { setChat } from "../../store/reducer.slice";

interface ChatsProps {
  active: string;
  setActive: (chatId: string) => void;
}

export const Chats: FC<ChatsProps> = ({ active, setActive }: ChatsProps) => {
  const dispatch = useDispatch();
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
            if (a.last_message.created_at < b.last_message.created_at) return 1;
            else if (a.last_message.created_at > b.last_message.created_at) return -1;
            else return 0;
          })
          .map((chat) => {
            const isActive = chat.id === active;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActive(chat.id);
                  dispatch(setChat(chat.title));
                }}
              >
                <ChatItemList
                  title={chat.title}
                  message={chat.last_message.message}
                  avatar={chat.avatar}
                  timestamp={chat.last_message.created_at}
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
