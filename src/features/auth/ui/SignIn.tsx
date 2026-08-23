import { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import z from 'zod';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Routes } from '@/shared/navigation/routes';
import AuthorizationTitle from './AuthorizationTitle';
import { signInSchema } from '@/entities/auth/schema';
import { useSignIn } from '../query/useSignIn';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(null);
  const { signIn, isPending, error: signInError } = useSignIn();

  const onSignIn = () => {
    const res = signInSchema.safeParse({ email, password });
    if (!res.success) {
      const { fieldErrors } = z.flattenError(res.error);
      setErrorFields({
        email: fieldErrors.email?.[0] ?? '',
        password: fieldErrors.password?.[0] ?? '',
      });
      return;
    }
    setErrorFields(null);
    signIn(res.data);
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
          errorMessage={errorFields?.email}
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          errorMessage={errorFields?.password}
        />
        {/* TODO реализовать мапинг ошибок */}
        {signInError && (
          <Text className="text-destructive text-xs mt-2">{signInError.message}</Text>
        )}
        <Button
          title="Войти"
          onPress={onSignIn}
          viewStyle="mt-10"
          disabled={isPending}
          loading={isPending}
        />
        <Button
          title="Создать аккаунт"
          onPress={onCreateAccount}
          variant="ghost"
          viewStyle="mt-2"
          disabled={isPending}
        />
      </View>
    </Container>
  );
};

export default SignIn;
