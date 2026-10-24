import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';
import InfoModal from '@/shared/ui/InfoModal';

export interface ISelectOption {
  label: string;
  value: string;
}

interface ISelectFieldProps {
  disabled?: boolean;
  label: string;
  icon: LucideIcon;
  options: ISelectOption[];
  value?: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  /** Если список внутри другой модалки */
  stackBehavior?: 'push' | 'replace' | 'switch';
  errorMessage?: string;
}

const SelectField = ({
  disabled,
  label,
  icon: Icon,
  options,
  value,
  placeholder,
  onValueChange,
  stackBehavior,
  errorMessage,
}: ISelectFieldProps) => {
  const { muted, primary } = useThemeTokens();
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    setOpen(false);
  };

  const renderItem = ({ item }: { item: ISelectOption }) => {
    const selected = item.value === value;

    return (
      <Pressable
        onPress={() => handleSelect(item.value)}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        className={`px-3 py-3 ${selected ? 'bg-tint-mint' : ''}`}>
        <Text className={`text-base ${selected ? 'text-primary font-medium' : 'text-foreground'}`}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="gap-1.5">
      <Text className="text-muted text-sm">{label}</Text>
      <Pressable
        disabled={disabled}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: open }}
        className="border-border flex-row items-center gap-3 rounded-md border px-3 py-3">
        <Icon color={primary} size={18} />
        <Text className={`flex-1 text-base ${selectedLabel ? 'text-foreground' : 'text-muted'}`}>
          {selectedLabel ?? placeholder}
        </Text>
        {open ? <ChevronUp color={muted} size={18} /> : <ChevronDown color={muted} size={18} />}
      </Pressable>
      {errorMessage && <Text className="text-destructive text-xs">{errorMessage}</Text>}
      <InfoModal
        visible={open}
        onClose={() => setOpen(false)}
        isList
        stackBehavior={stackBehavior}
        data={options}
        keyExtractor={(item) => item.value}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SelectField;
