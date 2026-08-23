import { Text, View } from 'react-native';
import { signOut } from '@/data/supabase/auth';
import Button from '@/shared/ui/Button';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/* TODO Пока что просто для выхода, пока хардкод */}
      <Button onPress={async () => await signOut()} title="Выйти" />
    </View>
  );
}
