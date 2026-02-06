import express, { json } from "express";
import cors from "cors";
import {
  generateChats,
  generateUser,
  generateUserMessages,
  generateUsers,
  getChatToUsersMap,
} from "./utils/index.js";
import { PORT } from "./config.js";
import { CHATS_AMOUNT } from "./constants.js";

const app = express();
app.use(cors());
app.use(json());
app.use(express.static("public"));

export const me = generateUser(true, 0);
export const users = generateUsers(CHATS_AMOUNT);
const userMessages = generateUserMessages(users);
const chats = generateChats(users, me, userMessages);

const messages = {};

app.get("/api/chats", (_, res) => {
  res.json(chats);
});

app.get("/api/chats/:id/messages", (req, res) => {
  const { id } = req.params;
  res.json(messages[id] || []);
});

app.post("/api/chats/:id/messages", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const newMessage = {
    id: "m" + Math.random(),
    sender: "me",
    text,
    ts: Date.now(),
  };

  if (!messages[id]) messages[id] = [];
  messages[id].push(newMessage);

  res.json(newMessage);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
