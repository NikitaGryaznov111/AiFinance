import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Text, View } from 'react-native';
import type { TOperation } from '../types/operation';
import OperationItem from './OperationItem';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';

interface IOperationsListProps {
  operations: TOperation[];
  isLoading: boolean;
}

export const OperationsList = ({ operations, isLoading }: IOperationsListProps) => {
  const { primary } = useThemeTokens();
  if (isLoading) {
    return <ActivityIndicator size="large" color={primary} />;
  }
  return (
    <FlashList
      data={operations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OperationItem operation={item} />}
      ItemSeparatorComponent={() => <View className="border-border border-b" />}
      ListEmptyComponent={<Text className="text-muted py-4 text-sm">Пока нет операций</Text>}
    />
  );
};
