const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

let chats = [
  {
    id: "1",
    title: "Alice",
    private: true,
    last_message: {
      created_at: Date.now(),
      message: "Hey!",
    },
    created_at: Date.now(),
    count_unread: 3,
    users: [],
  },
  {
    id: "2",
    title: "Bob",
    private: true,
    last_message: {
      created_at: Date.now(),
      message: "See you",
    },
    created_at: Date.now(),
    count_unread: 0,
    users: [],
  },
];

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
