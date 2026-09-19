import { type ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import { SafeAreaView, type Edges } from 'react-native-safe-area-context';

const screenGradient = {
  light: ['#ffffff', '#b7e0d6'],
  dark: ['#0b1210', '#1a4a40'],
} as const;

interface ISafeAreaScreenProps {
  children: ReactNode;
  isGradient?: boolean;
  edges?: Edges;
}

const SafeAreaScreen = ({ children, isGradient = false, edges }: ISafeAreaScreenProps) => {
  const { colorScheme } = useColorScheme();

  const content = (
    <SafeAreaView className="flex-1" edges={edges}>
      {children}
    </SafeAreaView>
  );

  if (!isGradient) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={edges}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={colorScheme === 'dark' ? screenGradient.dark : screenGradient.light}
      locations={[0.15, 1]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ flex: 1 }}>
      {content}
    </LinearGradient>
  );
};

export default SafeAreaScreen;
