export async function closeLock(isLock: boolean) {
    try {
        const res = await fetch("/api/lock", {
            method: "POST",
            body: isLock ? "true" : "false",
        });

        if (!res.ok) {
            console.error("Failed to update lock state");
        } else {
            console.log(`Lock state set to ${isLock ? "LOCKED 🔒" : "UNLOCKED 🔓"}`);
        }
    } catch (error) {
        console.error("Error updating lock state:", error);
    }
}