import { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import z from 'zod';
import { signUpFormSchema } from '@/entities/auth/schema/auth';
import { Routes } from '@/shared/navigation/routes';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { useSignUp } from '../query/useSignUp';

const SignUpForm = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(null);
  const { signUp, isPending, isSuccess, error: signUpError, data } = useSignUp();

  const onSignUp = () => {
    const res = signUpFormSchema.safeParse({ displayName, email, password, confirmPassword });
    if (!res.success) {
      const { fieldErrors } = z.flattenError(res.error);
      setErrorFields({
        displayName: fieldErrors.displayName?.[0] ?? '',
        email: fieldErrors.email?.[0] ?? '',
        password: fieldErrors.password?.[0] ?? '',
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? '',
      });
      return;
    }
    setErrorFields(null);
    signUp({
      displayName: res.data.displayName,
      email: res.data.email,
      password: res.data.password,
    });
  };

  const onSignIn = () => {
    router.replace(Routes.auth.signIn);
  };

  return (
    <View>
      <Input
        placeholder="Имя"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="words"
        autoComplete="name"
        autoCorrect={false}
        textContentType="name"
        inputStyle="mb-2"
        errorMessage={errorFields?.displayName}
      />
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
        autoComplete="new-password"
        textContentType="newPassword"
        inputStyle="mb-2"
        errorMessage={errorFields?.password}
      />
      <Input
        placeholder="Повторите пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        errorMessage={errorFields?.confirmPassword}
      />
      {isSuccess && !data?.session && (
        <Text className="text-primary mt-2 text-xs">Проверьте почту и подтвердите email</Text>
      )}
      {/* TODO реализовать мапинг ошибок */}
      {signUpError && <Text className="text-destructive mt-2 text-xs">{signUpError.message}</Text>}
      <Button
        title="Создать аккаунт"
        onPress={onSignUp}
        viewStyle="mt-10"
        disabled={isPending}
        loading={isPending}
      />
      <Button
        title="Уже есть аккаунт"
        onPress={onSignIn}
        variant="ghost"
        viewStyle="mt-2"
        disabled={isPending}
      />
    </View>
  );
};

export default SignUpForm;
