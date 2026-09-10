import { useState } from 'react';
import { Text, View } from 'react-native';
import { ChevronRight, Eye, EyeOff } from 'lucide-react-native';
import { formatRub } from '@/shared/lib/formatRub';
import Button from '@/shared/ui/Button';

interface IBalanceSectionProps {
  amount: number;
}

const BalanceSection = ({ amount }: IBalanceSectionProps) => {
  const [hidden, setHidden] = useState(false);

  return (
    <View className="mt-6 flex-row items-center justify-between">
      <View>
        <View className="flex-row items-center gap-2">
          <Text className="text-muted">Баланс</Text>
          <Button
            variant="ghost"
            icon={hidden ? EyeOff : Eye}
            iconSize={16}
            onPress={() => setHidden((value) => !value)}
            viewStyle="p-0"
            accessibilityLabel={hidden ? 'Показать баланс' : 'Скрыть баланс'}
          />
        </View>
        <Text className="text-foreground text-3xl font-bold">
          {hidden ? '₽ •••••' : formatRub(amount)}
        </Text>
      </View>
      <Button
        variant="ghost"
        icon={ChevronRight}
        onPress={() => {}}
        viewStyle="p-0"
        accessibilityLabel="Детали баланса"
      />
    </View>
  );
};

export default BalanceSection;
