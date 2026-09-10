import Home from '@/features/home/ui/Home';
import SafeAreaScreen from '@/shared/ui/SafeAreaScreen';

export default function HomeScreen() {
  return (
    <SafeAreaScreen edges={['top']}>
      <Home />
    </SafeAreaScreen>
  );
}
