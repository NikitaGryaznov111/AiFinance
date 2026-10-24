import { Pressable, Text, View } from 'react-native';
import type { TCategoryKind } from '@/features/operations/types/category';

interface IKindTabsProps {
  value: TCategoryKind;
  onChange: (kind: TCategoryKind) => void;
}
const KindTabs = ({ value, onChange }: IKindTabsProps) => {
  return (
    <View className="mt-5 flex-row gap-3">
      <Pressable
        onPress={() => onChange('expense')}
        accessibilityRole="button"
        accessibilityState={{ selected: value === 'expense' }}
        accessibilityLabel="Расходы"
        className={`flex-1 items-center rounded-lg py-3 ${
          value === 'expense' ? 'bg-primary' : 'border-primary border bg-background'
        }`}>
        <Text
          className={`text-sm font-medium ${
            value === 'expense' ? 'text-primary-foreground' : 'text-primary'
          }`}>
          Расходы
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('income')}
        accessibilityRole="button"
        accessibilityState={{ selected: value === 'income' }}
        accessibilityLabel="Доходы"
        className={`flex-1 items-center rounded-lg py-3 ${
          value === 'income' ? 'bg-primary' : 'border-primary border bg-background'
        }`}>
        <Text
          className={`text-sm font-medium ${
            value === 'income' ? 'text-primary-foreground' : 'text-primary'
          }`}>
          Доходы
        </Text>
      </Pressable>
    </View>
  );
};

export default KindTabs;
