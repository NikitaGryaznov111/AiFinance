import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { useThemeStore } from '../store/theme-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    setColorScheme(theme);
  }, [theme, setColorScheme]);

  return (
    <View className="flex-1 bg-background">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      {children}
    </View>
  );
}
