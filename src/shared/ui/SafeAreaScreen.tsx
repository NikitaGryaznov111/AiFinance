import { type ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import { SafeAreaView, type Edges } from 'react-native-safe-area-context';
import { Gradient } from './colors.constant';

interface ISafeAreaScreenProps {
  children: ReactNode;
  isGradient?: boolean;
  edges?: Edges;
}

const SafeAreaScreen = ({ children, isGradient = false, edges }: ISafeAreaScreenProps) => {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? Gradient.dark : Gradient.light;
  if (isGradient) {
    return (
      <LinearGradient
        colors={colors}
        locations={[0.15, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ flex: 1 }}>
        <SafeAreaView className="flex-1" edges={edges}>
          {children}
        </SafeAreaView>
      </LinearGradient>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-background" edges={edges}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaScreen;
