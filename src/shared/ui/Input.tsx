import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Colors } from './colors.constant';

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
  const { colorScheme } = useColorScheme();

  return (
    <View>
      {errorMessage && <Text className="text-destructive text-xs">{errorMessage}</Text>}
      <TextInput
        placeholderTextColor={colorScheme === 'dark' ? Colors.GrayL : Colors.Gray}
        className={`border-border bg-background text-foreground rounded-sm border px-3 py-2.5 ${inputStyle}`}
        {...props}
      />
    </View>
  );
};

export default Input;
