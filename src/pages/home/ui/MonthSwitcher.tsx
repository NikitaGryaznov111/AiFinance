import { Text, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Button from '@/shared/ui/Button';

interface IMonthSwitcherProps {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
}

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const MonthSwitcher = ({ month, onPrev, onNext }: IMonthSwitcherProps) => {
  const label = `${MONTHS[month.getMonth()]} ${month.getFullYear()}`;

  return (
    <View className="mt-6 flex-row items-center justify-center gap-4">
      <Button
        variant="ghost"
        icon={ChevronLeft}
        onPress={onPrev}
        viewStyle="p-1"
        accessibilityLabel="Предыдущий месяц"
      />
      <Text className="text-foreground text-lg font-semibold">{label}</Text>
      <Button
        variant="ghost"
        icon={ChevronRight}
        onPress={onNext}
        viewStyle="p-1"
        accessibilityLabel="Следующий месяц"
      />
    </View>
  );
};

export default MonthSwitcher;
