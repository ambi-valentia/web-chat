const STORAGE_KEY = 'chat_drafts';
const MAX_LIFETIME = 1000 * 60 * 60 * 24 * 7;

type Drafts = Record<string, {text: string; savedAt: number}>;

let memoryDrafts: Drafts = {};

export const loadChatDrafts = () => {
  const storedDrafts: Drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  const filteredDrafts: Drafts = {};
  Object.entries(storedDrafts).forEach(([id, draft]) => {
    if (Date.now() - draft.savedAt < MAX_LIFETIME) filteredDrafts[id] = draft;
  });

  memoryDrafts = filteredDrafts;
};

export const getChatDraft = (chatId: string) => memoryDrafts[chatId]?.text || '';

export const setChatDraft = (chatId: string, text: string) => {
  if (!text.trim()) {
    removeChatDraft(chatId);
    return;
  }
  memoryDrafts[chatId] = {text, savedAt: Date.now()};
};

export const persistChatDrafts = () =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryDrafts));

export const removeChatDraft = (chatId: string) => {
  if (memoryDrafts[chatId]) delete memoryDrafts[chatId];
};
