import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import z from 'zod';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Routes } from '@/shared/navigation/routes';
import AuthorizationTitle from './AuthorizationTitle';
import { signUpSchema } from '@/entities/auth/schema';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<Record<string, string> | null>(null);

  const onSignUp = () => {
    // TODO Можно подумать и если валидация повторяется, то вынести в кастомный хук
    const res = signUpSchema.safeParse({ email, password, confirmPassword });
    if (!res.success) {
      const { fieldErrors } = z.flattenError(res.error);
      setError({
        email: fieldErrors.email?.[0] ?? '',
        password: fieldErrors.password?.[0] ?? '',
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? '',
      });
      return;
    }
    // TODO Вызвать экшен регистрации
  };

  const onSignIn = () => {
    router.replace(Routes.auth.signIn);
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
          autoComplete="new-password"
          textContentType="newPassword"
          inputStyle="mb-2"
          errorMessage={error?.password}
        />
        <Input
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          errorMessage={error?.confirmPassword}
        />
        <Button title="Создать аккаунт" onPress={onSignUp} viewStyle="mt-10" />
        <Button title="Уже есть аккаунт" onPress={onSignIn} variant="ghost" viewStyle="mt-2" />
      </View>
    </Container>
  );
};

export default SignUp;
