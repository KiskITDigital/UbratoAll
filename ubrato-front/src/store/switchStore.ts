import { create } from 'zustand';

type SwitchState = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const useSwitchStore = create<SwitchState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));
