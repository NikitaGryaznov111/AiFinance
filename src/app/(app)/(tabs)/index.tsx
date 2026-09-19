import Home from '@/pages/home/ui/Home';
import SafeAreaScreen from '@/shared/ui/SafeAreaScreen';

export default function HomeScreen() {
  return (
    <SafeAreaScreen edges={['top']} isGradient>
      <Home />
    </SafeAreaScreen>
  );
}
