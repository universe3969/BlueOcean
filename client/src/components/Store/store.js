import create from "zustand";

let userStore = (set) => ({
  curId: null,
  toggleId: (id) => set((state) => ({ curId: id })),
});


export const useUserStore = create(userStore);
