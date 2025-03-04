export async function ultrasonicLog() {
    const newLog = {
        time: new Date().toISOString(), // Store full timestamp
        message: "Something is near!",
        pet_name: "DefaultPet",
    };
    

    // setLogs((prevLogs) => [newLog, ...prevLogs]);

    // Save log to database
    await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            pet_name: newLog.pet_name, // Change this dynamically if needed
            message: newLog.message 
        }),
    });

    return newLog;
}
