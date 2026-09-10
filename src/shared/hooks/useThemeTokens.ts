import { useUnstableNativeVariable } from 'nativewind';
// Хук для получение строковых значений темы, для использования там, где нет возможности прописать className
export function useThemeTokens() {
  return {
    primary: useUnstableNativeVariable('--color-primary'),
    muted: useUnstableNativeVariable('--color-muted'),
    background: useUnstableNativeVariable('--color-background'),
    border: useUnstableNativeVariable('--color-border'),
    foreground: useUnstableNativeVariable('--color-foreground'),
    primaryForeground: useUnstableNativeVariable('--color-primary-foreground'),
    secondaryForeground: useUnstableNativeVariable('--color-secondary-foreground'),
  };
}
