import '../../global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { queryClient } from '@/data/query/client';
import { ThemeProvider } from '@/features/theme/ui/ThemeProvider';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  // TODO: Пока без логики авторизации, чисто заглушка
  const session = null;

  useEffect(() => {
    if (!session) {
      router.replace('/sign-in');
    } else {
      router.replace('/');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
