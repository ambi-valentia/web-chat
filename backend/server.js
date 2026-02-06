import express, { json } from "express";
import cors from "cors";
import { generateChats } from "./utils.js";
import { PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(json());
app.use(express.static("public"));

let chats = generateChats(25);

let messages = {
  1: [
    { id: "m1", sender: "them", text: "Hey!", ts: Date.now() - 60000 },
    { id: "m2", sender: "me", text: "Hi!", ts: Date.now() - 30000 },
  ],
  2: [
    {
      id: "m3",
      sender: "them",
      text: "Are you there?",
      ts: Date.now() - 50000,
    },
  ],
};

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
