import { FC, useEffect, useRef } from "react";
import { Chats, ChatWindow, Header } from "../../components";
import classes from "./page.module.scss";
import { useDispatch } from "react-redux";
import { getMessages } from "../../api/chat";
import { setMessages } from "../../store/reducer.slice";
import { useSelector } from "react-redux";
import { selectActiveChat } from "../../store/selector";

export const PageIndex: FC = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);

  useEffect(() => {
    if (activeChat) {
      getMessages(activeChat.id)
        .then(({ response }) => {
          if (response.status === 200) dispatch(setMessages(response));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [activeChat, dispatch]);

  return (
    <>
      <Header title={activeChat?.title} />
      <div className={classes.body}>
        <Chats />
        {activeChat && <ChatWindow chatId={activeChat?.id} />}
      </div>
    </>
  );
};
