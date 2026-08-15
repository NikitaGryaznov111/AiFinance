import { TextInput, View, type TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Colors } from './colors.constant';

type IInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputStyle?: string;
} & Pick<
  TextInputProps,
  | 'secureTextEntry'
  | 'keyboardType'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'autoCorrect'
  | 'textContentType'
>;

const Input = ({ onChange, inputStyle = '', ...props }: IInputProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View>
      <TextInput
        onChangeText={onChange}
        placeholderTextColor={colorScheme === 'dark' ? Colors.GrayL : Colors.Gray}
        className={`border-border bg-background text-foreground rounded-sm border px-3 py-2.5 ${inputStyle}`}
        {...props}
      />
    </View>
  );
};

export default Input;
