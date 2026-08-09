import { TextInput, TextStyle, View } from 'react-native';

interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputStyle?: string;
}

const Input = ({ value, onChange, placeholder, inputStyle }: IInputProps) => {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        className={`border-border border rounded-sm px-3 py-2.5 ${inputStyle}`}
      />
    </View>
  );
};
export default Input;
