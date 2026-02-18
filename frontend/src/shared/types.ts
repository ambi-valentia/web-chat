type User = {
  id: string;
  name: string;
  surname: string;
  avatar: string;
  you: boolean;
};

export type Message = {
  id: string;
  created_at: number;
  user: User;
  message: string;
  is_new: boolean;
};

export type NewMessage = Omit<Message, 'id'> & {id?: string};

type LastMsg = Pick<Message, 'created_at' | 'message' | 'user'>;

export type Chat = {
  id: string;
  created_at: number;
  title: string;
  avatar: string;
  private: boolean;
  last_message: LastMsg;
  count_unread: number;
  users: User[];
  active?: boolean;
};
