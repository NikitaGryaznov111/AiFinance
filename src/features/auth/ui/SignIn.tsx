import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import z from 'zod';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Routes } from '@/shared/navigation/routes';
import AuthorizationTitle from './AuthorizationTitle';
import { signInSchema } from '@/entities/auth/schema';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Record<string, string> | null>(null);

  const onSignIn = () => {
    // TODO Можно подумать и если валидация повторяется, то вынести в кастомный хук
    const res = signInSchema.safeParse({ email, password });
    if (!res.success) {
      const { fieldErrors } = z.flattenError(res.error);
      setError({
        email: fieldErrors.email?.[0] ?? '',
        password: fieldErrors.password?.[0] ?? '',
      });
      return;
    }
    // TODO Вызвать экшен авторизации
  };

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
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          textContentType="emailAddress"
          inputStyle="mb-2"
          errorMessage={error?.email}
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          errorMessage={error?.password}
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
