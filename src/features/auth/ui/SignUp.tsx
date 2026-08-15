import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Routes } from '@/shared/navigation/routes';
import AuthorizationTitle from './AuthorizationTitle';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUp = () => {};

  const onSignIn = () => {
    router.push(Routes.auth.signIn);
  };

  return (
    <Container>
      <View className="flex-1 justify-center">
        <AuthorizationTitle />
        <Input
          placeholder="Email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          textContentType="emailAddress"
          inputStyle="mb-2"
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChange={setPassword}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          inputStyle="mb-2"
        />
        <Input
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={setConfirmPassword}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
        />
        <Button title="Создать аккаунт" onPress={onSignUp} viewStyle="mt-10" />
        <Button title="Уже есть аккаунт" onPress={onSignIn} variant="ghost" viewStyle="mt-2" />
      </View>
    </Container>
  );
};

export default SignUp;
