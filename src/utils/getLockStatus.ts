export async function getLockStatus(): Promise<boolean | null> {
    try {
        const res = await fetch("/api/lock");

        if (!res.ok) {
            console.error("Failed to fetch lock status");
            return null;
        }

        const data = await res.json();
        return data; // `data` จะเป็น true หรือ false
    } catch (error) {
        console.error("Error fetching lock status:", error);
        return null;
    }
}
