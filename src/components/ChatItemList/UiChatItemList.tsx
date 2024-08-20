import { FC } from "react";
import React from "react";
import classes from "./UiChatItem.module.scss";
import { Avatar } from "../Avatar";

interface IChatItemList {
  title?: string;
  message?: string;
  avatar?: string;
  timestamp?: number;
}

export const ChatItemList: FC<IChatItemList> = ({
  title = "Chat",
  message = "It is my first time like this. Thank you so mush! More then you know. Second line of the message",
  avatar = "https://avatars.lenzaos.com/oZWbsvwNw-3-.jpg",
  timestamp,
}: IChatItemList) => {
  let time = "12:47";
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (Number(hours) < 10) hours = "0" + hours;
    if (Number(minutes) < 10) minutes = "0" + minutes;
    time = hours + ":" + minutes;
  }

  return (
    <div className={classes.chat}>
      <Avatar src={avatar} size="md" />
      <div className={classes.content}>
        <div className={classes.top}>
          <span className={classes.title}>{title}</span>
          <span className={classes.time}>{time}</span>
        </div>
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
};
