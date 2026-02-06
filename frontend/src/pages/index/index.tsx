import {FC} from 'react';
import {useSelector} from 'react-redux';
import {Chats, Header} from '../../components';
import {selectActiveChat} from '../../store/selector';

export const PageIndex: FC = () => {
  const activeChat = useSelector(selectActiveChat);

  return (
    <>
      <Header title={activeChat?.title} />
      <Chats />
    </>
  );
};
