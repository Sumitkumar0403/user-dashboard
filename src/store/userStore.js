import { create } from "zustand";
import { usersData } from "../data/users";

export const useUserStore = create((set) => ({
  users: usersData,
  search: "",
  status: "all",

  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),

  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...updates } : u
      ),
    })),
}));
