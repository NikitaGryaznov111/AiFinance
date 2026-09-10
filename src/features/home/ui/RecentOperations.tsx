import { Text, View } from 'react-native';
import Button from '@/shared/ui/Button';
import type { THomeOperation } from '../types/operation';
import OperationRow from './OperationRow';

interface IRecentOperationsProps {
  operations: THomeOperation[];
}

const RecentOperations = ({ operations }: IRecentOperationsProps) => {
  return (
    <View className="mt-8">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-foreground text-lg font-bold">Последние операции</Text>
        <Button title="Все" variant="ghost" onPress={() => {}} viewStyle="px-0 py-0" />
      </View>
      {operations.length === 0 ? (
        <Text className="text-muted py-4 text-sm">Пока нет операций</Text>
      ) : (
        operations.map((operation, index) => (
          <OperationRow key={operation.id} isLast={index === operations.length - 1} />
        ))
      )}
    </View>
  );
};

export default RecentOperations;
