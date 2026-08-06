import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'default' | 'secondary' | 'outline';

interface IButtonProps {
    viewStyle?: string;
    textStyle?: string;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
    variant?: ButtonVariant;
    title: string;
}

const baseView = 'items-center justify-center rounded-md px-4 py-2.5 active:opacity-90';
const baseText = 'text-sm font-medium';

const variants: Record<ButtonVariant, { view: string; text: string }> = {
    // shadcn default — solid primary
    default: {
        view: 'bg-primary',
        text: 'text-primary-foreground',
    },
    // shadcn secondary — muted fill
    secondary: {
        view: 'bg-secondary',
        text: 'text-secondary-foreground',
    },
    // shadcn outline — border, transparent fill
    outline: {
        view: 'border border-border bg-transparent',
        text: 'text-foreground',
    },
};

const Button = ({
    viewStyle = '',
    textStyle = '',
    disabled = false,
    loading = false,
    onPress,
    variant = 'default',
    title,
}: IButtonProps) => {
    const styles = variants[variant];
    const isDisabled = disabled || loading;

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            className={`${baseView} ${styles.view} ${isDisabled ? 'opacity-50' : ''} ${viewStyle}`}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'default' ? '#ffffff' : undefined} />
            ) : (
                <Text className={`${baseText} ${styles.text} ${textStyle}`}>{title}</Text>
            )}
        </Pressable>
    );
};

export default Button;
