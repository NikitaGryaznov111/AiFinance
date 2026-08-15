import SignUp from '@/features/auth/ui/SignUp';
import SafeAreaScreen from '@/shared/ui/SafeAreaScreen';

export default function SignUpScreen() {
  return (
    <SafeAreaScreen isGradient={true}>
      <SignUp />
    </SafeAreaScreen>
  );
}
