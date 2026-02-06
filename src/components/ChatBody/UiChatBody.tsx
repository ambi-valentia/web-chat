import { FC, useEffect, useState } from "react";
import { ChatItemList } from "../ChatItemList/UiChatItemList";
import { getChatList } from "../../api/chat";
import { Chat } from "../../constants/types";
import { useDispatch } from "react-redux";
import { setChat } from "../../store/reducer.slice";
import { generateChats } from "./utils";
import { useSelector } from "react-redux";
import { selectActiveChat } from "../../store/selector";
import { ChatWindow } from "..";
import classes from "./UiChatBody.module.scss";

export const Chats: FC = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);
  const [chats, setChats] = useState<Chat[]>(generateChats(22));

  useEffect(() => {
    getChatList()
      .then((result) => {
        if (result.response.status === 200) setChats(result.response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={classes.body}>
      <div className={classes.chats}>
        {chats
          .sort((a, b) => b.last_message.created_at - a.last_message.created_at)
          .map((chat) => (
            <ChatItemList
              title={chat.title}
              message={chat.last_message.message}
              avatar={chat.avatar}
              timestamp={chat.last_message.created_at}
              active={chat.id === activeChat?.id}
              key={chat.id}
              onClick={() => dispatch(setChat(chat))}
            />
          ))}
      </div>
      {activeChat && <ChatWindow chatId={activeChat?.id} />}
    </div>
  );
};
