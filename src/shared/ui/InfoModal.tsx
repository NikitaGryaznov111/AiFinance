import { ReactElement, useCallback, useEffect, useRef, type ReactNode } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { ListRenderItem, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IInfoModalProps<T> {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  isList?: boolean;
  data?: T[];
  keyExtractor?: (item: T) => string;
  renderItem?: ListRenderItem<T>;
  listFooterComponent?: ReactElement | null;
  /** Стек модальных окон */
  stackBehavior?: 'push' | 'replace' | 'switch';
}

const InfoModal = <T,>({
  visible,
  onClose,
  children,
  isList,
  data,
  keyExtractor,
  renderItem,
  listFooterComponent,
  stackBehavior,
}: IInfoModalProps<T>) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const wasVisibleRef = useRef(false);
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const maxDynamicContentSize = height * 0.85;

  useEffect(() => {
    if (visible) {
      wasVisibleRef.current = true;
      bottomSheetModalRef.current?.present();
      return;
    }

    if (wasVisibleRef.current) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        opacity={0.5}
      />
    ),
    [],
  );

  const contentContainerStyle = {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16 + bottom,
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      maxDynamicContentSize={maxDynamicContentSize}
      stackBehavior={stackBehavior}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan"
      onDismiss={() => {
        wasVisibleRef.current = false;
        onClose();
      }}
      backdropComponent={renderBackdrop}>
      {isList ? (
        <BottomSheetFlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
          contentContainerStyle={contentContainerStyle}
        />
      ) : (
        <BottomSheetScrollView contentContainerStyle={contentContainerStyle}>
          {children}
        </BottomSheetScrollView>
      )}
    </BottomSheetModal>
  );
};

export default InfoModal;
