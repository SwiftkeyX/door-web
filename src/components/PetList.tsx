"use client";

import React, { useEffect, useState } from "react";
import Pet from "./Pet";
import { usePetQueries } from "@/utils/query/usePetQuery";
import NewPet from "./NewPet";

function PetList() {
    const { pets, createPet } = usePetQueries();
    const [newPetOpen, setNewPetOpen] = useState(true);

    useEffect(() => {
        console.log("Pets updated (from PetList):", pets);
    }, [pets]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-y-3">
                {pets?.map((pet, i) => (
                    <Pet key={i} pet={pet} />
                ))}
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-2 mt-3">
                <button className="text-xl font-bold bg-green-700 py-1 text-white px-4 rounded-xl w-full">
                    Add new
                </button>
                <button className="text-xl font-bold bg-blue-600 py-1 text-white px-4 rounded-xl w-full">
                    View all
                </button>
            </div>
        </div>
    );
}

export default PetList;
