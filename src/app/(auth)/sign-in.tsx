import SignIn from '@/features/auth/ui/SignIn';
import SafeAreaScreen from '@/shared/ui/SafeAreaScreen';

export default function SignInScreen() {
  return (
    <SafeAreaScreen isGradient={true}>
      <SignIn />
    </SafeAreaScreen>
  );
}
