import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-slate-900">AiFinance</Text>
      <Text className="mt-2 text-base text-slate-500">
        Expo Router + NativeWind ready
      </Text>
    </View>
  );
}
