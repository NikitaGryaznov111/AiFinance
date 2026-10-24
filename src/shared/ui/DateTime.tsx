import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePicker from '@expo/ui/community/datetime-picker';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';

type TDateTimeMode = 'date' | 'time';

interface IDateTimeProps {
  label: string;
  value: Date | null;
  placeholder: string;
  onValueChange: (value: Date | null) => void;
  mode?: TDateTimeMode;
  errorMessage?: string;
}

const FORMAT_BY_MODE: Record<TDateTimeMode, string> = {
  date: 'DD.MM.YYYY',
  time: 'HH:mm',
};

const DateTime = ({
  label,
  value,
  placeholder,
  onValueChange,
  mode = 'date',
  errorMessage,
}: IDateTimeProps) => {
  const { primary } = useThemeTokens();
  const [open, setOpen] = useState(false);
  const displayValue = value ? dayjs(value).format(FORMAT_BY_MODE[mode]) : undefined;

  const handleValueChange = (_event: unknown, next: Date) => {
    onValueChange(next);
    setOpen(false);
  };

  return (
    <View className="gap-1.5">
      <Text className="text-muted text-sm">{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ expanded: open }}
        className="border-border flex-row items-center gap-3 rounded-md border px-3 py-3">
        <Calendar color={primary} size={18} />
        <Text className={`flex-1 text-base ${displayValue ? 'text-foreground' : 'text-muted'}`}>
          {displayValue ?? placeholder}
        </Text>
      </Pressable>
      {errorMessage && <Text className="text-destructive text-xs">{errorMessage}</Text>}
      {open ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          presentation="dialog"
          onValueChange={handleValueChange}
          onDismiss={() => setOpen(false)}
        />
      ) : null}
    </View>
  );
};

export default DateTime;
