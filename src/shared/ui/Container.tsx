import { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

interface IContainerProps {
  children: ReactNode;
  scroll?: boolean;
}

const Container = ({ children, scroll = true }: IContainerProps) => {
  if (scroll) {
    return (
      <ScrollView className="flex-1" contentContainerClassName="grow px-4 pb-4">
        {children}
      </ScrollView>
    );
  }

  return <View className="flex-1 px-4 pb-4">{children}</View>;
};

export default Container;
