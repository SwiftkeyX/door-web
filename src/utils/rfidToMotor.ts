export async function rfidToMotor() {
    try {
        // Fetch RFID data from /api/rfid
        const res = await fetch("/api/rfid");
        const data = await res.json();

        console.log("RFID Data:", data);

        // If RFID is detected (not null), update /api/lock to "true"
        if (data.rfid !== null) {
            const lockRes = await fetch("/api/lock", {
                method: "POST",
                body: "false",
            });

            if (!lockRes.ok) {
                console.error("Failed to update lock state");
            } else {
                console.log("Lock state set to true");
            }
        }
    } catch (error) {
        console.error("Error checking RFID:", error);
    }
}