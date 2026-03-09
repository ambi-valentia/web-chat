import {RefObject} from 'react';

const INIT_INPUT_HEIGHT = 36;

type Params = {ref: RefObject<HTMLTextAreaElement>; height?: number; maxHeight?: number};

export const setInputHeight = ({ref, height, maxHeight}: Params) => {
  const input = ref.current;
  if (input) {
    const canGrow = maxHeight ? input?.clientHeight <= maxHeight : true;
    if (canGrow) input.style.height = (height ?? input.scrollHeight) + 'px';
  }
};

export const resetInputHeight = (ref: RefObject<HTMLTextAreaElement>) =>
  setInputHeight({ref, height: INIT_INPUT_HEIGHT});
