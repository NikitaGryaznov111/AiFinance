import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Routes } from '@/shared/navigation/routes';
import AuthorizationTitle from './AuthorizationTitle';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {};

  const onCreateAccount = () => {
    router.replace(Routes.auth.signUp);
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
          autoComplete="password"
          textContentType="password"
        />
        <Button title="Войти" onPress={onSignIn} viewStyle="mt-10" />
        <Button
          title="Создать аккаунт"
          onPress={onCreateAccount}
          variant="ghost"
          viewStyle="mt-2"
        />
      </View>
    </Container>
  );
};

export default SignIn;
