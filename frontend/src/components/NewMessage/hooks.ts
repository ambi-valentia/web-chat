import {RefObject, useCallback, useRef} from 'react';

const INIT_INPUT_HEIGHT = 36;

type Params = {ref: RefObject<HTMLTextAreaElement>; height?: number; maxHeight?: number};

export const useResizeInput = ({ref}: Params) => {
  const prevHeight = useRef<number>(-1);
  const input = ref.current;

  const resizeInput = useCallback(
    ({height, maxHeight}: Omit<Params, 'ref'>) => {
      if (!input) return;

      const newHeight = height ?? input.scrollHeight;
      const shouldResize = maxHeight ? input.clientHeight < maxHeight : true;

      if (newHeight === prevHeight.current || !shouldResize) return;

      input.style.height = newHeight + 'px';
      prevHeight.current = newHeight;
    },
    [input]
  );

  const resetInputHeight = useCallback(
    () => resizeInput({height: INIT_INPUT_HEIGHT}),
    [resizeInput]
  );

  return {resetInputHeight, resizeInput};
};
