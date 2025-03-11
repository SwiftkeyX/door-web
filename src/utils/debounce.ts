let lastNotificationTime = 0;
const DEBOUNCE_DELAY = 10_000; // 60 seconds

export function canSendNotification(): boolean {
    const now = Date.now();
    if (now - lastNotificationTime >= DEBOUNCE_DELAY) {
        console.log("now", now, "lastNotificationTime", lastNotificationTime);
        lastNotificationTime = now;
        return true;
    }
    return false;
}
