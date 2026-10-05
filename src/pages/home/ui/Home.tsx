import { useState } from 'react';
import { View } from 'react-native';
import { Plus } from 'lucide-react-native';
import AddOperations from '@/features/operations/ui/AddOperations';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import InfoModal from '@/shared/ui/InfoModal';
import BalanceSection from './BalanceSection';
import HomeHeader from './HomeHeader';
import MonthlyLimit from './MonthlyLimit';
import RecentOperations from './RecentOperations';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // TODO Данные с бэка — через query-хуки фич, сюда пропсами в секции.
  return (
    <View className="flex-1">
      <Container>
        <View className="pb-16">
          <HomeHeader />
          <BalanceSection amount={0} />
          <MonthlyLimit spent={0} limit={0} />
          <RecentOperations operations={[]} />
        </View>
      </Container>
      <Button
        icon={Plus}
        iconSize={28}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Добавить операцию"
        viewStyle="absolute bottom-4 right-4 h-14 w-14 rounded-full p-0"
      />
      <InfoModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <AddOperations />
      </InfoModal>
    </View>
  );
};

export default Home;
