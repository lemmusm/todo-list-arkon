import { useEffect, useRef } from 'react';

const useUnload = (fn) => {
  const eventListenerRef = useRef(fn);

  useEffect(() => {
    eventListenerRef.current = (event) => {
      fn?.(event);
      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      // instead it requires `event.returnValue` to be set
      if (event.defaultPrevented) {
        return (event = '');
      }
    };
  }, [fn]);

  useEffect(() => {
    const onUnload = (event) => {
      eventListenerRef.current(event);
    };

    window.addEventListener('beforeunload', onUnload);
    window.onbeforeunload = null;

    return () => {
      window.removeEventListener('beforeunload', onUnload);
      window.onbeforeunload = null;
    };
  }, []);
};

export default useUnload;
