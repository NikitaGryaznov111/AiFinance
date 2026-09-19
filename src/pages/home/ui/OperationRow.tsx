import { Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Button from '@/shared/ui/Button';

interface IOperationRowProps {
  isLast?: boolean;
}
// TODO Пока что карскас, пока неизвестны реальные поля с API.
const OperationRow = ({ isLast = false }: IOperationRowProps) => {
  return (
    <View className={`flex-row items-center py-3 ${isLast ? '' : 'border-border border-b'}`}>
      <View className="bg-secondary h-11 w-11 rounded-full" />
      <View className="ml-3 flex-1">
        <Text className="text-foreground font-medium">Название</Text>
        <Text className="text-muted text-xs">Категория</Text>
      </View>
      <Text className="text-muted mr-1">₽ —</Text>
      <Button
        variant="ghost"
        icon={ChevronRight}
        iconSize={16}
        onPress={() => {}}
        viewStyle="p-0"
        accessibilityLabel="Детали операции"
      />
    </View>
  );
};

export default OperationRow;
