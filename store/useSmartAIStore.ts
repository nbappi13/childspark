import { create } from "zustand";

type SmartAIStore = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const useSmartAIStore = create<SmartAIStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
