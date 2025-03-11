import type { Pet } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface PetProps {
    pet: Pet;
    handleDeletePet: (id: number) => Promise<void>;
}

const Pet = ({ pet, handleDeletePet }: PetProps) => {
    return (
        <div className="bg-amber-200 rounded-3xl p-3 grid grid-cols-[1fr_100px]">
            <div className="flex flex-row gap-5">
                <div className="">
                    <Image src="/dog1.png" alt="" width={75} height={75} />
                </div>
                <div className="flex flex-col justify-center items-start w-full">
                    <div className="name font-bold text-xl">{pet.pet_name}</div>
                    <div className="status ">UID: {pet.uid}</div>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button
                    className="bg-red-700 rounded-xl text-xl font-bold p-2 text-white"
                    onClick={() => handleDeletePet(pet.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default Pet;
