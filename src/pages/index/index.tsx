import React, { FC, useEffect, useState } from "react";
import { IPage } from "../../interface/page";
import { Chats, ChatWindow, Header } from "../../components";
import classes from "./page.module.scss";
import { useDispatch } from "react-redux";
import { getMessages } from "../../api/chat";
import { setMessages } from "../../store/reducer.slice";

export const PageIndex: FC<IPage> = (props: IPage) => {
  const { title } = props;
  const [chat, setChat] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (chat) {
      getMessages(chat)
        .then((result) => {
          dispatch(setMessages(result.response));
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [chat]);

  if (error) {
    alert(`Error: ${error.message}`);
  }


  return (
    <>
      <Header title={title} />
      <div className={classes.body}>
        <Chats active={chat} setActive={setChat} />
        <ChatWindow chatId={chat} />
      </div>
    </>
  );
};
