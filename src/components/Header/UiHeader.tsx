import { FC } from "react";
import classes from "./UiHeader.module.scss";
import { ReactComponent as Chat } from "../../assets/Chat.svg";

interface IHeader {
  title?: string;
}

export const Header: FC<IHeader> = ({ title = "Chat" }: IHeader) => {
  return (
    <div className={classes.header}>
      <div className={classes.chats}>All chats</div>
      <div className={`${classes.chats} ${classes.chats__active}`}>
        <Chat />
        <span>{title}</span>
      </div>
    </div>
  );
};
