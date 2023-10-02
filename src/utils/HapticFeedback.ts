import HapticFeedback from 'react-native-haptic-feedback';

export function hapticFeedback(
  type: string = 'impactLight',
  force = true,
): void {
  HapticFeedback.trigger(type, {
    enableVibrateFallback: force,
    ignoreAndroidSystemSettings: force,
  });
}
