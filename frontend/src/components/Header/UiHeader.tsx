import { FC } from "react";
import { ReactComponent as Chat } from "../../assets/Chat.svg";
import classes from "./UiHeader.module.scss";

interface IHeader {
  title?: string;
}

export const Header: FC<IHeader> = ({ title = "Chat" }: IHeader) => {
  return (
    <div className={classes.header}>
      <span className={classes.chats}>All chats</span>
      <div className={classes.chats__active}>
        <Chat />
        <span>{title}</span>
      </div>
    </div>
  );
};
