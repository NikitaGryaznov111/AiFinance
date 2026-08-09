import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Container from '@/shared/ui/Container';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Routes } from '@/shared/navigation/routes';
import AuthorizationTitle from './AuthorizationTitle';

// ПРОДОЛЖИ РАБОТУ С ЭКРАНОМ ВХОДА И ОБЩИМИ КОМПОНЕНТАМИ
// 1. Shared UI — черновик, но с дырами
// Button outline — нет border, визуально почти «пустая» кнопка.
// Input — нет secureTextEntry / keyboardType, placeholder в dark может быть нечитаемым; лишний View-обёртка; неиспользуемый TextStyle.
// AuthorizationTitle — мёртвые импорты (StyleSheet, React).
// Container — scroll по умолчанию + flex-1 на contentContainer иногда даёт странный скролл на коротких экранах; для auth чаще scroll={false} или наоборот без flex-1.
// 2. Что делать дальше (по приоритету)
// Довести SignUp по образцу SignIn (feature UI + тонкий route + токены).
// Заглушки tabs → bg-background / text-foreground (или SafeAreaScreen).
// Подключить реальную сессию и убрать хардкод session = null.
// Первая entity: Transaction + zod; первый кусок data/db / repository — иначе слои останутся теорией.
// Auth: features/auth + вызовы в data/supabase (не бизнес-логику в UI).

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {};

  const onCreateAccount = () => {
    router.push(Routes.auth.signUp);
  };

  return (
    <Container>
      <View className="flex-1 justify-center">
        <AuthorizationTitle />
        <Input placeholder="Email" value={email} onChange={setEmail} inputStyle={'mb-2'} />
        <Input placeholder="Пароль" value={password} onChange={setPassword} />
        <Button title="Войти" onPress={onSignIn} viewStyle="mt-10" />
        <Button
          title="Создать аккаунт"
          onPress={onCreateAccount}
          variant="outline"
          viewStyle="mt-2"
        />
      </View>
    </Container>
  );
};

export default SignIn;
