import create from 'zustand';
import { persist } from 'zustand/middleware';

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
        document
          .querySelector('body')
          .style.setProperty('--note-width', newWidth);

        if (
          curr.defaultWidth === defaultVal &&
          curr.activeNoteWidth === newWidth
        ) {
          return;
        }
        set({ defaultWidth: defaultVal, activeNoteWidth: newWidth });
      },
    }),
    {
      name: 'note-width-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useNoteWidth;
