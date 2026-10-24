import SafeAreaScreen from '@/shared/ui/SafeAreaScreen';
import Operations from '@/pages/operations/ui/Operations';
export default function OperationsScreen() {
  return (
    <SafeAreaScreen edges={['top']}>
      <Operations />
    </SafeAreaScreen>
  );
}
