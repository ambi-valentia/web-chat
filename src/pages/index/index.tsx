import React, { FC, useEffect, useState } from "react";
import { Chats, ChatWindow, Header } from "../../components";
import classes from "./page.module.scss";
import { useDispatch } from "react-redux";
import { getMessages } from "../../api/chat";
import { setMessages } from "../../store/reducer.slice";
import { useSelector } from "react-redux";
import { selectActiveChat } from "../../store/selector";

export const PageIndex: FC = () => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState("");
  const [error, setError] = useState<Error>();
  const title = useSelector(selectActiveChat);

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
