import { View } from 'react-native';
import { Plus } from 'lucide-react-native';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import BalanceSection from './BalanceSection';
import HomeHeader from './HomeHeader';
import MonthlyLimit from './MonthlyLimit';
import RecentOperations from './RecentOperations';

const Home = () => {
  // TODO Реализовать получение данных из хуков query для передачи их дочерним компонентам, пока что моковые данные. Либо использовать query хуки внутри дочерних компонентов, если данные нужны изолированно внутри компонента, надо будет подумать.
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
        onPress={() => {}}
        accessibilityLabel="Добавить операцию"
        viewStyle="absolute bottom-4 right-4 h-14 w-14 rounded-full p-0"
      />
    </View>
  );
};

export default Home;
