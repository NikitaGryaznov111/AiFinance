import { Pressable, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';
import { formatRub } from '@/shared/lib/formatRub';
import type { TCategoryKind } from '@/features/operations/types/category';
import ProgressBar from '@/shared/ui/ProgressBar';

interface IPlanSummaryCardProps {
  kind: TCategoryKind;
  onPress: () => void;
}

const PlanSummaryCard = ({ kind, onPress }: IPlanSummaryCardProps) => {
  const { muted } = useThemeTokens();
  const title = kind === 'expense' ? 'План расходов' : 'План доходов';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="border-border mt-5 rounded-xl border px-4 py-4">
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-muted text-sm">{title}</Text>
          <Text className="text-foreground mt-1 text-3xl font-bold">{formatRub(0)}</Text>
          <Text className="text-muted mt-2 text-sm">План ещё не задан</Text>
        </View>
        <ChevronRight color={muted} size={20} />
      </View>
      <View className="mt-4">
        <ProgressBar progress={0} />
      </View>
    </Pressable>
  );
};

export default PlanSummaryCard;
