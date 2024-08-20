import { FC } from "react";
import React from "react";
import classes from "./chatItem.module.scss";
import { Avatar } from "../Avatar";

interface IChatItemList {
  title?: string;
  message?: string;
}

export const ChatItemList: FC<IChatItemList> = ({
  title = "Chat",
  message = "It is my first time like this. Thank you so mush! More then you know. Second line of the message",
}: IChatItemList) => {
  return (
    <div className={classes.chat}>
      <Avatar
        src="https://avatars.lenzaos.com/oZWbsvwNw-3-.jpg"
        size="md"
      />
      <div className={classes.content}>
        <div className={classes.top}>
          <span className={classes.title}>{title}</span>
          <span className={classes.time}>12:47</span>
        </div>
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
};
