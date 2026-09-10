import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';

type TButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';

interface IButtonProps {
  viewStyle?: string;
  textStyle?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  variant?: TButtonVariant;
  title?: string;
  icon?: LucideIcon;
  iconSize?: number;
  accessibilityLabel?: string;
}

const baseView = 'items-center justify-center rounded-md active:opacity-90 px-4 py-2.5';
const baseText = 'text-sm font-medium';

const variants: Record<TButtonVariant, { view: string; text: string }> = {
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
  icon,
  iconSize,
  accessibilityLabel,
}: IButtonProps) => {
  const styles = variants[variant];
  const { primary, primaryForeground, secondaryForeground } = useThemeTokens();
  const iconColor =
    variant === 'default'
      ? primaryForeground
      : variant === 'secondary'
        ? secondaryForeground
        : primary;
  const isDisabled = disabled || loading;
  const label = accessibilityLabel ?? title;
  const Icon = icon;
  const renderedIcon = Icon ? <Icon color={iconColor} size={iconSize ?? 20} /> : null;

  const content = () => {
    if (loading) {
      return <ActivityIndicator color={iconColor} />;
    }
    if (Icon && title) {
      return (
        <View className="flex-row items-center gap-2">
          {renderedIcon}
          <Text className={`${baseText} ${styles.text} ${textStyle}`}>{title}</Text>
        </View>
      );
    }
    if (Icon) {
      return renderedIcon;
    }
    return <Text className={`${baseText} ${styles.text} ${textStyle}`}>{title}</Text>;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={label}
      className={`${baseView} ${styles.view} ${isDisabled ? 'opacity-50' : ''} ${viewStyle}`}>
      {content()}
    </Pressable>
  );
};

export default Button;
