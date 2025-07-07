import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // this will be the key in localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // only persist what we need
    }
  )
);

export default useAuthStore;
