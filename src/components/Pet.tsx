import type { Pet } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface PetProps {
    pet: Pet;
}

const Pet = ({ pet }: PetProps) => {
    return (
        <div className="bg-amber-200 rounded-3xl p-3 flex flex-row gap-4 ">
            <div className="">
                <Image src="/dog1.png" alt="" width={100} height={100} />
            </div>

            <div className="flex flex-col justify-center items-start w-full">
                <div className="name font-bold text-xl">{pet.pet_name}</div>
                <div className="status ">Code: {pet.uid}</div>
            </div>
        </div>
    );
};

export default Pet;
