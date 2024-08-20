interface LastMsg {
    created_at: number;
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