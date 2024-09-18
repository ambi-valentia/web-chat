import { FC, useEffect, useRef, useState } from "react";
import { Chats, ChatWindow, Header } from "../../components";
import classes from "./page.module.scss";
import { useDispatch } from "react-redux";
import { getMessages } from "../../api/chat";
import { setMessages } from "../../store/reducer.slice";
import { useSelector } from "react-redux";
import { selectActiveChat } from "../../store/selector";

export const PageIndex: FC = () => {
  const dispatch = useDispatch();
  const title = useSelector(selectActiveChat);
  const chat = useRef("");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (chat) {
      getMessages(chat.current)
        .then((result) => {
          dispatch(setMessages(result.response));
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [chat.current]);

  if (error) {
    alert(`Error: ${error.message}`);
  }


  return (
    <>
      <Header title={title} />
      <div className={classes.body}>
        <Chats active={chat.current} setActive={(id) => chat.current = id} />
        <ChatWindow chatId={chat.current} />
      </div>
    </>
  );
};
