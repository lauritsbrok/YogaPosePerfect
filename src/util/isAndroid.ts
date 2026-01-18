export function isAndroid(window: Window): boolean {
  const userAgent = window.navigator.userAgent;
  return /Android/.test(userAgent);
}
