import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Bell, User } from 'lucide-react-native';
import { useSession } from '@/providers/SessionProvider';
import { Routes } from '@/shared/navigation/routes';
import Button from '@/shared/ui/Button';

const HomeHeader = () => {
  const { user } = useSession();
  const displayName = user?.displayName;

  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center gap-3">
        <Button
          icon={User}
          onPress={() => router.push(Routes.app.profile)}
          viewStyle="h-11 w-11 rounded-full p-0"
          accessibilityLabel="Профиль"
        />
        <View>
          <Text className="text-muted text-sm">Привет</Text>
          <Text className="text-primary text-xl font-bold">{displayName ?? 'AiFinance'}</Text>
        </View>
      </View>
      <Button
        variant="ghost"
        icon={Bell}
        onPress={() => {}}
        viewStyle="p-2"
        accessibilityLabel="Уведомления"
      />
    </View>
  );
};

export default HomeHeader;
