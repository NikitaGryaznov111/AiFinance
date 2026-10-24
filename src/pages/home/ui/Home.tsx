import { useState } from 'react';
import { View } from 'react-native';
import type { TCategoryKind } from '@/features/operations/types/category';
import Button from '@/shared/ui/Button';
import Container from '@/shared/ui/Container';
import HomeHeader from './HomeHeader';
import KindTabs from './KindTabs';
import MonthSwitcher from './MonthSwitcher';
import PlanSummaryCard from './PlanSummaryCard';

const Home = () => {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [kind, setKind] = useState<TCategoryKind>('expense');

  const changeMonth = (delta: number) => {
    const newDate = new Date(month.getFullYear(), month.getMonth() + delta, 1);
    setMonth(newDate);
  };

  const handleCreatePlan = () => {};

  return (
    <View className="flex-1">
      <Container>
        <HomeHeader />
        <MonthSwitcher month={month} onPrev={() => changeMonth(-1)} onNext={() => changeMonth(1)} />
        <KindTabs value={kind} onChange={setKind} />
        <PlanSummaryCard kind={kind} onPress={handleCreatePlan} />
        <Button title="Создать план" onPress={handleCreatePlan} viewStyle="mt-5" />
      </Container>
    </View>
  );
};

export default Home;
