import express, { json } from "express";
import cors from "cors";
import {
  generateChats,
  generateUser,
  generateUserMessages,
  generateUsers,
} from "./utils/index.js";
import { PORT } from "./config.js";
import { CHATS_AMOUNT } from "./constants.js";
import { getRandomNumber } from "./utils/helpers.js";

const app = express();
app.use(cors());
app.use(json());
app.use(express.static("public"));

export const me = generateUser(true, 0);
export const users = generateUsers(CHATS_AMOUNT, me);
const { chats, chatsToUsersMap } = generateChats(users, me);
const messages = {};

app.get("/api/chats", (_, res) => {
  res.json(Object.values(chats));
});

app.get("/api/chats/:id/messages", (req, res) => {
  const { id } = req.params;

  if (!messages[id]) {
    messages[id] = generateUserMessages({
      amount: getRandomNumber(1, 50),
      user: chatsToUsersMap[id],
      lastMessage: chats[id].last_message,
      unreadCount: chats[id].count_unread,
    });
  }

  res.json(messages[id]);
});

app.post("/api/chats/:id/messages", (req, res) => {
  const { id } = req.params;
  const { text, created_at } = req.body;

  const newMessage = {
    id: "m" + Math.random(),
    user: me,
    message: text,
    created_at,
    is_new: false,
  };

  if (!messages[id]) messages[id] = [];

  messages[id].push(newMessage);
  chats[id].last_message = {
    created_at: newMessage.created_at,
    message: newMessage.message,
  };

  res.json(newMessage);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
