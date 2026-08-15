import { Text, View } from 'react-native';

const AuthorizationTitle = () => {
  return (
    <View className="justify-center mb-4">
      <Text className="text-2xl font-bold text-foreground">AiFinance</Text>
      <Text className="text-sm text-muted">Управляй финансами с умом</Text>
    </View>
  );
};

export default AuthorizationTitle;
