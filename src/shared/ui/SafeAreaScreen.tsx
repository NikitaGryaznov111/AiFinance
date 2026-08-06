import { SafeAreaView } from "react-native-safe-area-context"

interface ISafeAreaScreenProps {
    children: React.ReactNode
}
const SafeAreaScreen = ({ children }: ISafeAreaScreenProps) => {
    return (
        <SafeAreaView className="flex-1 bg-background ">
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaScreen

