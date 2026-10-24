import * as Burnt from 'burnt';

export const toast = (message: string) => {
  void Burnt.toast({
    title: message,
    preset: 'none',
  });
};
