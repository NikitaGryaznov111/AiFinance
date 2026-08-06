import SafeAreaScreen from '@/shared/ui/SafeAreaScreen'
import { Text, View } from 'react-native'
import AuthorizationTitle from './AuthorizationTitle'
import Container from '@/shared/ui/Container'

const SignIn = () => {
    return (
        <SafeAreaScreen>
            <Container>
                <AuthorizationTitle />
            </Container>
        </SafeAreaScreen>
    )
}

export default SignIn

