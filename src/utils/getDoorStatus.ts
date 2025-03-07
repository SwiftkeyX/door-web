export async function getDoorStatus(): Promise<boolean | null> {
    try {
        const res = await fetch("/api/door");

        if (!res.ok) {
            console.error("Failed to fetch door status");
            return null;
        }

        const data = await res.json();
        return data; // `data` จะเป็น true หรือ false
    } catch (error) {
        console.error("Error fetching door status:", error);
        return null;
    }
}
