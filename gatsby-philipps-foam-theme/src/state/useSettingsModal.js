import create from 'zustand';

const useSettingsModal = create((set, get) => ({
  isOpen: false,
  open: () => {
    if (get().isOpen === true) return;
    set(() => ({
      isOpen: true,
    }));
  },
  close: () => {
    if (get().isOpen === false) return;
    set(() => ({
      isOpen: false,
    }));
  },
}));

export default useSettingsModal;
