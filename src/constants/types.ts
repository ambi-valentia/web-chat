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
    active: boolean;
}

interface User {
    id?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    you: boolean;
}

export interface Message {
    id?: string;
    created_at: number;
    user: User;
    message: string;
    is_new: boolean
}