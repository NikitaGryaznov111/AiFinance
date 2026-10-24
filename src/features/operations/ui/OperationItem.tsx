import { Pressable, Text, View } from 'react-native';
import {
  Briefcase,
  Car,
  ChevronRight,
  Clapperboard,
  Ellipsis,
  Gift,
  HeartPulse,
  House,
  Repeat,
  Shirt,
  ShoppingCart,
  Utensils,
  Wallet,
  type LucideIcon,
} from 'lucide-react-native';
import { useThemeTokens } from '@/shared/hooks/useThemeTokens';
import type { TOperation } from '../types/operation';
import dayjs from 'dayjs';
import { getDateTime } from '@/shared/lib/formatDateTime';

interface IOperationItemProps {
  operation: TOperation;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'shopping-cart': ShoppingCart,
  utensils: Utensils,
  car: Car,
  house: House,
  'heart-pulse': HeartPulse,
  shirt: Shirt,
  clapperboard: Clapperboard,
  repeat: Repeat,
  ellipsis: Ellipsis,
  wallet: Wallet,
  briefcase: Briefcase,
  gift: Gift,
};

const OperationItem = ({ operation }: IOperationItemProps) => {
  const { primary, muted } = useThemeTokens();
  const { comment, categoryName, categoryIcon, occurredAt, amount, kind } = operation;
  const isIncome = kind === 'income';
  const Icon = CATEGORY_ICONS[categoryIcon] ?? Ellipsis;
  const dateTime = getDateTime(occurredAt);

  return (
    <Pressable
      onPress={() => {}}
      accessibilityRole="button"
      accessibilityLabel={categoryName}
      className="flex-row items-center py-3 active:opacity-70">
      <View className="h-11 w-11 items-center justify-center">
        <Icon color={primary} size={20} />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-foreground font-medium" numberOfLines={1}>
          {categoryName}
        </Text>
        <Text className="text-muted text-xs" numberOfLines={1}>
          {comment}
        </Text>
        <Text className="text-muted text-xs">{dateTime}</Text>
      </View>
      <Text className={`mr-1 font-medium ${isIncome ? 'text-income' : 'text-expense'}`}>
        {isIncome ? '+' : '-'} ₽ {amount}
      </Text>
      <ChevronRight color={muted} size={16} />
    </Pressable>
  );
};

export default OperationItem;
