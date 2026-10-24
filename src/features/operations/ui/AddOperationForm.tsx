import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { ArrowDown, ArrowUp, MessageSquare, Tag, type LucideIcon } from 'lucide-react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';
import Button from '@/shared/ui/Button';
import SelectField from '@/shared/ui/SelectField';
import DateTime from '@/shared/ui/DateTime';
import { toSelectOptions } from '@/shared/lib/toSelectOptions';
import { useCategory } from '../query/useCategory';
import type { TCategory, TCategoryKind } from '../types/category';
import { useCreateOperation } from '../query/useOperations';
import { checkOperationSchema } from '../schema/operation';
import { toIsoDateTime } from '@/shared/lib/formatDateTime';

interface IKindOptionProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onPress: () => void;
}

const KindOption = ({ label, icon: Icon, selected, onPress }: IKindOptionProps) => {
  const { primary, primaryForeground } = useThemeTokens();
  const iconColor = selected ? primaryForeground : primary;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      className={`flex-1 flex-row items-center justify-center gap-2 rounded-md border py-3 ${
        selected ? 'border-primary bg-primary' : 'border-primary bg-background'
      }`}>
      <View
        className={`h-6 w-6 items-center justify-center rounded-full ${
          selected ? 'bg-white/20' : 'bg-tint-mint'
        }`}>
        <Icon color={iconColor} size={14} />
      </View>
      <Text
        className={`text-sm font-medium ${selected ? 'text-primary-foreground' : 'text-primary'}`}>
        {label}
      </Text>
    </Pressable>
  );
};

const AddOperationForm = () => {
  const { muted, primary } = useThemeTokens();
  const [kind, setKind] = useState<TCategoryKind>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [comment, setComment] = useState('');
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(null);
  const { data: dataCategories = [], isLoading } = useCategory();
  const { createOperation, isPending } = useCreateOperation();
  // Получаю категории в зависимости от вида операции - расход или доход
  const categories = dataCategories.filter((c) => c.kind === kind);
  const categoriesOptions = toSelectOptions<TCategory>(categories, 'name', 'id');

  const reset = () => {
    setAmount('');
    setCategory('');
    setDate(null);
    setTime(null);
    setComment('');
    setErrorFields(null);
    setKind('expense');
  };

  const handleSave = async () => {
    // В схему передаю все поля, чтобы потом собрать из result.data, но проверяю на ошибки только 4 поля, которые обязательные
    const result = checkOperationSchema({ amount, category, date, time, comment });
    if (!result.ok) {
      setErrorFields(result.fieldErrors);
      return;
    }
    setErrorFields(null);
    const operation = {
      amount: result.data.amount,
      category_id: result.data.category,
      comment: result.data.comment || null,
      occurred_at: toIsoDateTime(result.data.date, result.data.time),
    };
    await createOperation(operation);
    reset();
    // TODO Реализуй закрытие модального окна
  };

  const handleKind = (kind: TCategoryKind) => {
    setKind(kind);
    setCategory('');
  };

  return (
    <View className="gap-5">
      <Text className="text-primary text-xl font-bold">Новая операция</Text>
      <View className="flex-row gap-3">
        <KindOption
          label="Расход"
          icon={ArrowDown}
          selected={kind === 'expense'}
          onPress={() => handleKind('expense')}
        />
        <KindOption
          label="Доход"
          icon={ArrowUp}
          selected={kind === 'income'}
          onPress={() => handleKind('income')}
        />
      </View>
      {/* Сумма */}
      <View className="flex-row items-center justify-center gap-2 py-2">
        <Text className="text-primary text-3xl font-bold">₽</Text>
        <BottomSheetTextInput
          value={amount}
          onChangeText={(value) => setAmount(value.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor={muted}
          className="text-foreground min-w-12 text-center text-3xl font-bold"
        />
      </View>
      {errorFields?.amount && (
        <Text className="text-destructive text-xs text-center">{errorFields.amount}</Text>
      )}
      <View className="gap-4">
        <SelectField
          disabled={isLoading}
          label="Категория"
          icon={Tag}
          options={categoriesOptions}
          value={category}
          placeholder={isLoading ? 'Загрузка категорий...' : 'Выберите категорию'}
          onValueChange={setCategory}
          stackBehavior="push"
          errorMessage={errorFields?.category}
        />
        {/* Дата и время */}
        <DateTime
          label="Дата"
          value={date}
          placeholder="Выберите дату"
          onValueChange={setDate}
          errorMessage={errorFields?.date}
        />
        <DateTime
          label="Время"
          value={time}
          placeholder="Выберите время"
          onValueChange={setTime}
          mode="time"
          errorMessage={errorFields?.time}
        />
        {/* Комментарий */}
        <View className="gap-1.5">
          <Text className="text-muted text-sm">Комментарий</Text>
          <View className="border-border flex-row items-center gap-3 rounded-md border px-3 py-3">
            <MessageSquare color={primary} size={18} />
            <BottomSheetTextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Добавить комментарий"
              placeholderTextColor={muted}
              className="text-foreground flex-1 text-base"
            />
          </View>
        </View>
      </View>
      <Button title="Сохранить" onPress={handleSave} disabled={isPending} loading={isPending} />
    </View>
  );
};

export default AddOperationForm;
