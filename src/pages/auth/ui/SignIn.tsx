import { View } from 'react-native';
import SignInForm from '@/features/auth/ui/SignInForm';
import Container from '@/shared/ui/Container';
import AuthorizationTitle from './AuthorizationTitle';

const SignIn = () => {
  return (
    <Container>
      <View className="flex-1 justify-center">
        <AuthorizationTitle />
        <SignInForm />
      </View>
    </Container>
  );
};

export default SignIn;
