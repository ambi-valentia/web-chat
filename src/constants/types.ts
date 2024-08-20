interface LastMsg {
    created_at: number;
    user_id: string;
    user_name: string;
    user_surname: string;
    you: boolean;
    message: string;
}

interface Users {
    id: string;
    name: string;
    surname: string;
    avatar: string;
    you: boolean;
}

export interface Chat {
    id: string;
      created_at: number;
      title: string;
      avatar: string;
      private: boolean;
      last_message: LastMsg;
      count_unread: boolean;
      users: Users[];
    }