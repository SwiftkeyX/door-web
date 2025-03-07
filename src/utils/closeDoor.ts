export async function closeDoor(isOpen: boolean) {
    try {
        const res = await fetch("/api/door", {
            method: "POST",
            body: isOpen ? "true" : "false",
        });

        if (!res.ok) {
            console.error("Failed to update door state");
        } else {
            console.log(`door state set to ${isOpen ? "door 🔒" : "UNdoor 🔓"}`);
        }
    } catch (error) {
        console.error("Error updating door state:", error);
    }
}

