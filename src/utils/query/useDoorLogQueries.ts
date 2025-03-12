"use client";

import { PetPostRequest } from "@/app/api/pet/route";
import { DoorLog, Pet } from "@prisma/client";
import { useEffect, useState } from "react";

export interface DoorLogWithPet extends DoorLog {
    pet?: Pet;
}

export function useDoorLogQueries() {
    const [doorLogs, setDoorLogs] = useState<DoorLogWithPet[]>([]);

    useEffect(() => {
        console.log("Door logs updated:", doorLogs);
    }, [doorLogs]);

    async function fetchDoorLogs() {
        const res = await fetch("/api/door/log");
        const newDoorLogs = (await res.json()) as any[];

        setDoorLogs(
            newDoorLogs.map((log) => ({
                ...log,
                created_at: new Date(log.created_at),
            }))
        );
    }

    useEffect(() => {
        fetchDoorLogs();
    }, []);

    return { doorLogs, fetchDoorLogs };
}
