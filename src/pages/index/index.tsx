import { FC, useEffect } from "react";
import { Chats, Header } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../api/chat";
import { setMessages } from "../../store/reducer.slice";
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
      <Chats />
    </>
  );
};
