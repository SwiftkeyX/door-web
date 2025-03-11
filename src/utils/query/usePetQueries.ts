"use client";

import { PetPostRequest } from "@/app/api/pet/route";
import { Pet } from "@prisma/client";
import { useEffect, useState } from "react";

export function usePetQueries() {
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        console.log("Pets updated:", pets);
    }, [pets]);

    async function fetchPets() {
        const res = await fetch("/api/pet");
        const newPets = (await res.json()) as Pet[];
        setPets(newPets);
    }

    async function createPet(pet: PetPostRequest) {
        const res = await fetch("/api/pet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
        });

        if (res.ok) {
            await fetchPets();
        }

        return res;
    }

    async function deletePet(id: number) {
        const res = await fetch(`/api/pet/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            await fetchPets();
        }

        return res;
    }

    useEffect(() => {
        fetchPets();
    }, []);

    return { pets, fetchPets, createPet, deletePet };
}
