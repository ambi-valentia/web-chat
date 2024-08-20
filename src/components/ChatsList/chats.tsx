import { FC } from "react";
import { ChatItemList } from "../ChatItemList/chatItemList";
import classes from "./chats.module.scss";
import { getChatList } from "../../api/chat";

interface ChatsListProps {
  //chats: ChatItemList[];
}

export const Chats: FC = () => {
  const conversations = getChatList();
  console.log(conversations);
  return (
    <div className={classes.chats}>
      <ChatItemList title="Name Surnamewdwdwddwdwdwwdwdwd" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
      <ChatItemList title="Name Surname" />
    </div>
  );
};
