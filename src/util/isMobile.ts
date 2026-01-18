import { isAndroid } from './isAndroid';
import { isIOS } from './isIOS';

export function isMobile(window: Window) {
  return isAndroid(window) || isIOS(window);
}
