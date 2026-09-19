import { View } from 'react-native';
import SignUpForm from '@/features/auth/ui/SignUpForm';
import Container from '@/shared/ui/Container';
import AuthorizationTitle from './AuthorizationTitle';

const SignUp = () => {
  return (
    <Container>
      <View className="flex-1 justify-center">
        <AuthorizationTitle />
        <SignUpForm />
      </View>
    </Container>
  );
};

export default SignUp;
