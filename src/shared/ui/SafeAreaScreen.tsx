import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradient } from './colors.constant';

interface ISafeAreaScreenProps {
  children: React.ReactNode;
  isGradient?: boolean;
}

const SafeAreaScreen = ({ children, isGradient = false }: ISafeAreaScreenProps) => {
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
        <SafeAreaView className="flex-1">{children}</SafeAreaView>
      </LinearGradient>
    );
  }
  return <SafeAreaView className="flex-1 bg-background">{children}</SafeAreaView>;
};

export default SafeAreaScreen;
