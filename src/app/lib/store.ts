// src/lib/store.ts
import { create } from 'zustand';

interface LoadingState {
    isRetrying: boolean;
    showRetryOverlay: () => void;
    hideRetryOverlay: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
    isRetrying: false,
    showRetryOverlay: () => set({ isRetrying: true }),
    hideRetryOverlay: () => set({ isRetrying: false }),
}));