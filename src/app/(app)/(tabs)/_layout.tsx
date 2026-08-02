import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Главная' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Операции' }} />
      <Tabs.Screen name="analytics" options={{ title: 'Аналитика' }} />
      <Tabs.Screen name="profile" options={{ title: 'Профиль' }} />
    </Tabs>
  );
}