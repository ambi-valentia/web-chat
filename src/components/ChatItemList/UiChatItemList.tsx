import { FC, useState } from "react";
import React from "react";
import classes from "./UiChatItem.module.scss";
import { Avatar } from "../Avatar";

interface IChatItemList {
  title?: string;
  message?: string;
  avatar?: string;
  timestamp?: number;
  active?: boolean;
}

export const ChatItemList: FC<IChatItemList> = ({
  title = "Chat",
  message = "It is my first time like this. Thank you so mush! More then you know. Second line of the message",
  avatar = "https://avatars.lenzaos.com/oZWbsvwNw-3-.jpg",
  active = false,
  timestamp,
}: IChatItemList) => {
  return (
    <div className={`${classes.chat} ${active ? classes.chat_active : ""}`}>
      <Avatar src={avatar} size="md" />
      <div className={classes.content}>
        <div className={classes.top}>
          <span className={classes.title}>{title}</span>
          {timestamp && (
            <span className={classes.time}>
              {
                new Date(timestamp * 1000)
                  .toLocaleString("ru")
                  .split(",")[1].slice(0,6)
              }
            </span>
          )}
        </div>
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
};
