import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';

type IInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  inputStyle?: string;
  errorMessage?: string;
} & Pick<
  TextInputProps,
  | 'secureTextEntry'
  | 'keyboardType'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'textContentType'
>;

const Input = ({ inputStyle = '', errorMessage, ...props }: IInputProps) => {
  const { muted } = useThemeTokens();

  return (
    <View>
      {errorMessage && <Text className="text-destructive text-xs">{errorMessage}</Text>}
      <TextInput
        placeholderTextColor={muted}
        className={`border-border bg-background text-foreground rounded-sm border px-3 py-2.5 ${inputStyle}`}
        {...props}
      />
    </View>
  );
};

export default Input;
