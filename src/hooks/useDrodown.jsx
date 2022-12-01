import create from "zustand";

export const dropdownStore = create((set, get) => ({
  isOpen: false,
  text: null,
  currentValue: "defaultValue",
  handleToggleDropdown: () => set((state) => ({ isOpen: !state.isOpen })),
  handleCloseDropdown: () => set((state) => ({ isOpen: false })),
  handleClickDropdownItem: (e) => {
    get().handleSetValue(e.target.dataset.value);
    get().handleSetText(e.target.textContent);
    get().handleCloseDropdown();
  },
  handleSetValue: (v) => set((state) => ({ currentValue: v })),
  handleSetText: (text) => set((state) => ({ text })),
}));
