import { View } from 'react-native';
import { useGetOperations } from '@/features/operations/query/useOperations';
import { OperationsList } from '@/features/operations/ui/OperationsList';

const Operations = () => {
  const { data = [], isLoading } = useGetOperations();
  return (
    <View className="mt-8">
      <OperationsList operations={data} isLoading={isLoading} />
    </View>
  );
};

export default Operations;
