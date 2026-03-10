import {Dispatch, RefObject, SetStateAction, useEffect, useLayoutEffect, useRef} from 'react';
import {getChatDraft, persistChatDrafts} from '../../shared';

const INIT_INPUT_HEIGHT = 36;
const MAX_INPUT_HEIGHT = 250;

type ResizeParams = {
  ref: RefObject<HTMLTextAreaElement>;
  message: string;
  height?: number;
  maxHeight?: number;
};

export const useResizeInput = ({ref, message}: Pick<ResizeParams, 'ref' | 'message'>) => {
  const prevHeight = useRef<number>(-1);
  const input = ref.current;

  useLayoutEffect(() => {
    const resizeInput = ({height, maxHeight}: Pick<ResizeParams, 'height' | 'maxHeight'>) => {
      if (!input) return;

      const newHeight = height ?? input.scrollHeight;
      const shouldResize = maxHeight ? input.clientHeight < maxHeight : true;

      if (newHeight === prevHeight.current || !shouldResize) return;

      input.style.height = newHeight + 'px';
      prevHeight.current = newHeight;
    };

    const resetInputHeight = () => resizeInput({height: INIT_INPUT_HEIGHT});

    if (!message.trim()) {
      resetInputHeight();
      return;
    }
    resizeInput({maxHeight: MAX_INPUT_HEIGHT});
  }, [input, message]);
};

export const useChatDrafts = (chatId: string, setMessage: Dispatch<SetStateAction<string>>) => {
  const prevChatId = useRef<string>('');

  useLayoutEffect(() => {
    if (prevChatId.current !== chatId) {
      prevChatId.current = chatId;
      persistChatDrafts();
      setMessage(getChatDraft(chatId));
    }
  }, [chatId, setMessage]);

  useEffect(() => {
    const handleUnload = () => persistChatDrafts();

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
};
