"use client";

import React, { useEffect, useState } from "react";
import Pet from "./Pet";
import { usePetQueries } from "@/utils/query/usePetQueries";
import NewPetModal from "./NewPetModal";
import { useMqtt } from "@/utils/providers/MqttProvider";
import { PetPostRequest } from "@/app/api/pet/route";
import toast from "react-hot-toast";

function PetList() {
    const { pets, createPet, deletePet } = usePetQueries();
    const [isNewPetModalOpen, setIsNewPetModalOpen] = useState(false);
    const { client: mqttClient } = useMqtt();

    useEffect(() => {
        console.log("Pets updated (from PetList):", pets);
    }, [pets]);

    async function handleCreatePet(req: PetPostRequest) {
        const res = await createPet(req);
        mqttClient?.publish("pet", "changed");

        if (res.ok) {
            toast.success("Sucessfully added pet!");
        } else {
            toast.error("Failed to add pet, please try again later");
        }
    }

    async function handleDeletePet(petId: number) {
        const res = await deletePet(petId);
        mqttClient?.publish("pet", "changed");

        if (res.ok) {
            toast.success("Sucessfully removed pet!");
        } else {
            toast.error("Failed to remove pet, please try again later");
        }
    }

    return (
        <div className="flex flex-col">
            {isNewPetModalOpen && (
                <NewPetModal
                    isOpen={isNewPetModalOpen}
                    setIsOpen={setIsNewPetModalOpen}
                    handleCreatePet={handleCreatePet}
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
                        <Pet
                            key={i}
                            pet={pet}
                            handleDeletePet={handleDeletePet}
                        />
                    ))}
            </div>

            <button
                className="text-xl font-bold bg-green-700 py-1 text-white px-4 rounded-xl w-full mt-3"
                onClick={() => {
                    setIsNewPetModalOpen(true);
                }}
            >
                Add new
            </button>
        </div>
    );
}

export default PetList;
