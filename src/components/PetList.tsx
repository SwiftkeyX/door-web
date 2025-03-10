"use client";

import React, { useEffect, useState } from "react";
import Pet from "./Pet";
import { usePetQueries } from "@/utils/query/usePetQueries";
import NewPet from "./NewPet";
import NewPetModal from "./NewPetModal";
import connectMqtt from "@/lib/mqttService";
import { useMqttClient } from "@/utils/useMqttClient";

function PetList() {
    const { pets, createPet, deletePet } = usePetQueries();
    const [isNewPetModalOpen, setIsNewPetModalOpen] = useState(false);

    useEffect(() => {
        console.log("Pets updated (from PetList):", pets);
    }, [pets]);

    return (
        <div className="flex flex-col">
            {isNewPetModalOpen && (
                <NewPetModal
                    isOpen={isNewPetModalOpen}
                    setIsOpen={setIsNewPetModalOpen}
                    createPet={createPet}
                />
            )}

            <div className="flex flex-col gap-y-3 ring-1 ring-gray-300 rounded-4xl p-2 h-[360px] overflow-y-scroll">
                {pets.length == 0 && (
                    <div className="text-xl font-medium text-center">
                        No pets available
                    </div>
                )}
                {pets.length > 0 &&
                    pets?.map((pet, i) => (
                        <Pet key={i} pet={pet} deletePet={deletePet} />
                    ))}
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-2 mt-3">
                <button
                    className="text-xl font-bold bg-green-700 py-1 text-white px-4 rounded-xl w-full"
                    onClick={() => {
                        setIsNewPetModalOpen(true);
                    }}
                >
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
