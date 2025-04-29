import create from 'zustand';

interface ModalState {
  isOpen: boolean;
  formData: FormData | null;
  setOpen: (isOpen: boolean) => void;
  setFormData: (formData: FormData) => void;
  resetModal: () => void;
}

export interface FormData {
  checkbox: boolean;
  input: string;
  switch: boolean;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  formData: null,
  setOpen: (isOpen) => set({ isOpen }),
  setFormData: (formData) => set({ formData }),
  resetModal: () => set({ isOpen: false, formData: null }),
}));
