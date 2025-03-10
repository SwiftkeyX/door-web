import { PetPostRequest } from "@/app/api/pet/route";
import { useState } from "react";

interface NewPetModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    createPet: (req: PetPostRequest) => Promise<void>;
}

export default function NewPetModal({
    isOpen,
    setIsOpen,
    createPet,
}: NewPetModalProps) {
    const [petName, setPetName] = useState<string>("");
    const [petUID, setPetUID] = useState<string>("");

    async function handleCreatePet() {
        createPet({
            pet_name: petName,
            uid: petUID,
        });
        setIsOpen(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                <button
                    className="absolute top-2 right-3 text-gray-500"
                    onClick={() => setIsOpen(false)}
                >
                    ✖
                </button>
                <h2 className="text-2xl font-bold mb-2">Add a new pet</h2>

                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg">Pet name</div>
                        <input
                            className="border border-gray-300 rounded-lg text-md px-2"
                            placeholder="Enter new pet name"
                            value={petName}
                            onChange={(e) => setPetName(e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg">Pet UID</div>
                        <input
                            className="border border-gray-300 rounded-lg text-md px-2"
                            placeholder="Enter new pet UID in hex (ex. FF000000)"
                            maxLength={8}
                            value={petUID}
                            onChange={(e) => setPetUID(e.currentTarget.value)}
                        />
                    </div>

                    <button
                        className="bg-green-700 text-white font-semibold rounded-md h-[30px] mt-[10px]"
                        onClick={() => handleCreatePet()}
                    >
                        Add new
                    </button>
                </div>
            </div>
        </div>
    );
}
