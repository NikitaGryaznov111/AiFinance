import { View } from 'react-native';

interface IProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressBarProps) => {
  const pct = Math.min(100, Math.max(0, progress));

  return (
    <View className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <View className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} />
    </View>
  );
};

export default ProgressBar;
