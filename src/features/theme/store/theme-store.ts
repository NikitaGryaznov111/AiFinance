import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

export type TThemes = 'system' | 'light' | 'dark';

const keyStorage = 'theme'

type TThemeStore = {
    theme: TThemes,
    setTheme: (theme: TThemes) => void
}

export const useThemeStore = create<TThemeStore>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: keyStorage,
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)

