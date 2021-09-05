import create from 'zustand';
import { persist } from 'zustand/middleware';

const setCssVariable = (newWidth) => {
  document.querySelector('body').style.setProperty('--note-width', newWidth);
};

const useNoteWidth = create(
  persist(
    (set, get) => ({
      defaultWidth: null,
      userWidth: null,
      activeNoteWidth: null,
      initWidth: (defaultVal) => {
        const curr = get();
        let newWidth;

        if (curr.userWidth === null) {
          newWidth = defaultVal;
        } else {
          newWidth = curr.userWidth;
        }
        setCssVariable(newWidth);

        if (
          curr.defaultWidth === defaultVal &&
          curr.activeNoteWidth === newWidth
        ) {
          return;
        }
        set({ defaultWidth: defaultVal, activeNoteWidth: newWidth });
      },
      resetWidth: () => {
        const curr = get();
        set({
          userWidth: null,
          activeNoteWidth: curr.defaultWidth,
        });

        setCssVariable(curr.defaultWidth);
      },
      setUserWidth: (userWidth) => {
        set({
          userWidth: userWidth,
          activeNoteWidth: userWidth,
        });

        setCssVariable(userWidth);
      },
    }),
    {
      name: 'note-width-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useNoteWidth;
