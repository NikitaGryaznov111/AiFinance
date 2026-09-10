import { Text, View } from 'react-native';
import { formatRub } from '@/shared/lib/formatRub';
import ProgressBar from '@/shared/ui/ProgressBar';

interface IMonthlyLimitProps {
  spent: number;
  limit: number;
}

const MonthlyLimit = ({ spent, limit }: IMonthlyLimitProps) => {
  const percent = limit > 0 ? Math.round((spent / limit) * 100) : 0;
  const remaining = Math.max(0, limit - spent);

  return (
    <View className="mt-8">
      <Text className="text-muted">Расходы за этот месяц</Text>
      <View className="mt-1 flex-row items-baseline gap-2">
        <Text className="text-foreground text-xl font-bold">{formatRub(spent)}</Text>
        <Text className="text-muted text-sm">из {formatRub(limit)}</Text>
      </View>
      <View className="mt-3">
        <ProgressBar progress={percent} />
      </View>
      <View className="mt-2 flex-row justify-between">
        <Text className="text-primary text-sm">{percent}% от лимита</Text>
        <Text className="text-muted text-sm">Осталось {formatRub(remaining)}</Text>
      </View>
    </View>
  );
};

export default MonthlyLimit;
