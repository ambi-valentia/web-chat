import {FC} from 'react';
import {useSelector} from 'react-redux';
import {selectActiveChat} from '../../store/selector';
import {ChatBody, Header} from '..';

export const Main: FC = () => {
  const activeChat = useSelector(selectActiveChat);

  return (
    <>
      <Header title={activeChat?.title} />
      <ChatBody />
    </>
  );
};
