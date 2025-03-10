import { PetPostRequest } from "@/app/api/pet/route";
import { usePetQueries } from "@/utils/query/usePetQuery";
import type { Pet as NewPet } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";

interface NewPetProps {
    createPet?: (pet: PetPostRequest) => Promise<void>;
}

function NewPet({ createPet }: NewPetProps) {
    const [newPetName, setNewPetName] = useState<string>("");
    const [newPetCode, setNewPetCode] = useState<string>("");

    function handlePetNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPetName(event.currentTarget.value);
    }

    function handlePetCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewPetCode(event.currentTarget.value);
    }

    function handleCreatePet() {
        if (createPet !== undefined) {
            createPet({
                pet_name: newPetName,
                uid: newPetCode,
            });
        }
    }

    return (
        <div className="bg-green-200 rounded-3xl p-3 grid grid-cols-[1fr_0.1fr]">
            <div className="flex flex-col justify-center items-start gap-y-1">
                <input
                    className="bg-white name font-bold text-[1.2rem]"
                    placeholder="Enter pet name here"
                    onChange={handlePetNameChange}
                    value={newPetName}
                />

                <input
                    className="bg-white status"
                    placeholder="Enter pet RFID code here"
                    onChange={handlePetCodeChange}
                    value={newPetCode}
                    maxLength={8}
                />
            </div>

            <div className="flex flex-col gap-y-1">
                <button
                    className="bg-green-300 px-5 cursor-pointer rounded-lg font-bold text-xl"
                    onClick={handleCreatePet}
                >
                    Create
                </button>

                <button className="bg-red-300 px-5 cursor-pointer rounded-lg font-bold text-xl">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default NewPet;
