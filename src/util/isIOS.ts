export function isIOS(window: Window): boolean {
  const userAgent = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent);
}
