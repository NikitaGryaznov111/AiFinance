import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';

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
  default: {
    view: 'bg-primary',
    text: 'text-primary-foreground',
  },
  secondary: {
    view: 'bg-secondary',
    text: 'text-secondary-foreground',
  },
  outline: {
    view: 'border border-primary bg-transparent',
    text: 'text-primary',
  },
  ghost: {
    view: 'bg-transparent',
    text: 'text-primary',
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
      className={`${baseView} ${styles.view} ${isDisabled ? 'opacity-50' : ''} ${viewStyle}`}>
      {loading ? (
        <ActivityIndicator className={styles.text} />
      ) : (
        <Text className={`${baseText} ${styles.text} ${textStyle}`}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;
